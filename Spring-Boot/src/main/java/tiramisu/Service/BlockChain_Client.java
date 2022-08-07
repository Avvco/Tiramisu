package tiramisu.Service;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.exceptions.TransactionException;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.tx.response.PollingTransactionReceiptProcessor;
import org.web3j.tx.response.TransactionReceiptProcessor;

import tiramisu.Tiramisu.TiramisuSpringBootApplication;


@Service
public class BlockChain_Client {

  @Value("${blockchain.dev.contract.address}")
  private String CONTRACT_ADDRESS;

  @Value("${blockchain.dev.contract.node-url}")
  private String NODE_URL;

  @Value("${blockchain.dev.account.private-key}")
  private String PRIVATE_KEY;


  /**
   * Query the state of the smart contract, without gas fee
   * @param <T>
   * @return
   * @see https://docs.web3j.io/4.8.7/transactions/transactions_and_smart_contracts/#querying-the-state-of-a-smart-contract
   */
  @SuppressWarnings({"unchecked", "rawtypes"})
  public <T> T QueryContract() {

    // Connect to the node
    TiramisuSpringBootApplication.log.info("Connecting to Node ...");
    Web3j web3j = Web3j.build(new HttpService(NODE_URL));
    TiramisuSpringBootApplication.log.info("Successfuly connected to Node via: " + NODE_URL);

    // Load an account
    Credentials credentials = Credentials.create(PRIVATE_KEY);
    TiramisuSpringBootApplication.log.info("Loaded account: " + credentials.getAddress());

    // Get nonce
    EthGetTransactionCount ethGetTransactionCount = null;
    try {
      ethGetTransactionCount = web3j.ethGetTransactionCount(
        CONTRACT_ADDRESS, DefaultBlockParameterName.LATEST).sendAsync().get();
    } catch (InterruptedException | ExecutionException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Get nonce failed");
    }
    BigInteger nonce = ethGetTransactionCount.getTransactionCount();
    TiramisuSpringBootApplication.log.info("Loaded nonce: " + nonce);

    // Build function
    // https://github.com/gjeanmart/stackexchange/blob/master/72889-how-to-create-a-rawtransaction-for-contract-interaction-web3j/Web3j/src/main/java/me/gjeanmart/stackoverflow/web3j/Main.java
    Function function = new Function("notRevealedUri",
            Arrays.asList(), 
            Arrays.asList(new TypeReference<Utf8String>() {}));
    // new TypeReference<Utf8String>() {}

    String encodedFunction = FunctionEncoder.encode(function);

    TiramisuSpringBootApplication.log.info("EncodedFunction: " + encodedFunction);

    // Send transaction
    org.web3j.protocol.core.methods.response.EthCall response = null;
    try {
      response = web3j.ethCall(
        Transaction.createEthCallTransaction(credentials.getAddress(), CONTRACT_ADDRESS, encodedFunction),
        DefaultBlockParameterName.LATEST)
        .sendAsync().get();
    } catch (InterruptedException | ExecutionException e) {
      e.printStackTrace();
    } 
    

    if(response.hasError()) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "From Smart Contract: " + response.getError().getMessage());
    }

    List<Type> value = FunctionReturnDecoder.decode(
             response.getValue(), function.getOutputParameters());
                 
    TiramisuSpringBootApplication.log.info("DecodedFunction: " + value.get(0).getValue());
    return (T) value.get(0).getValue().toString();
  }

  /**
   * Modify the state of the smart contract, require gas fee
   * @see https://ethereum.stackexchange.com/questions/72889/how-to-create-a-rawtransaction-for-contract-interaction-web3j
   */
  public String ModifyContract() {

    // Connect to the node
    TiramisuSpringBootApplication.log.info("Connecting to Node ...");
    Web3j web3j = Web3j.build(new HttpService(NODE_URL));
    TiramisuSpringBootApplication.log.info("Successfuly connected to Node via: " + NODE_URL);

    // Load an account
    Credentials credentials = Credentials.create(PRIVATE_KEY);
    TiramisuSpringBootApplication.log.info("Loaded account: " + credentials.getAddress());



    Function function = new Function("setNotRevealedURI",
            Arrays.asList(new Utf8String("123459789012")),  
            Arrays.asList());
    // new TypeReference<Utf8String>() {}

    String encodedFunction = FunctionEncoder.encode(function);

    TiramisuSpringBootApplication.log.info("EncodedFunction: " + encodedFunction);

    TransactionManager txManager = new RawTransactionManager(web3j, credentials);

    // Get gas
    Transfer transfer = new Transfer(web3j, txManager);
    BigInteger gasPrice;
    try {
      gasPrice = transfer.requestCurrentGasPrice();
      TiramisuSpringBootApplication.log.info("Gas Price: " + gasPrice);
    } catch (IOException e) {
      e.printStackTrace();
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to get gas price.");
    }

    String txHash = "";
    try {
      txHash = txManager.sendTransaction(
        gasPrice, 
        DefaultGasProvider.GAS_LIMIT, 
        CONTRACT_ADDRESS, 
        encodedFunction, 
        BigInteger.ZERO)
        .getTransactionHash();
    } catch (IOException e) {
      e.printStackTrace();
    }
    
    TransactionReceiptProcessor receiptProcessor = new PollingTransactionReceiptProcessor(
      web3j, 
      TransactionManager.DEFAULT_POLLING_FREQUENCY, 
      TransactionManager.DEFAULT_POLLING_ATTEMPTS_PER_TX_HASH);

    TransactionReceipt txReceipt = null;
    try {
      txReceipt = receiptProcessor.waitForTransactionReceipt(txHash);
    } catch (IOException | TransactionException e) {
      e.printStackTrace(); 
    }
    String result = "Function \""+ function.getName() + "\" done in TransactionHash \"" + txReceipt.getTransactionHash() + "\", with " + txReceipt.getGasUsed() + " gas used.";
    TiramisuSpringBootApplication.log.info(result);
    return result;
  }
}

