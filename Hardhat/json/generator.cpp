#include <bits/stdc++.h>

#include <sys/types.h>
#include <sys/stat.h>

using namespace std;

int const MEDICAL_ACCOUNT = 5;
int const PATIENT_ACCOUNT = 10;

string const MEDICAL_BASE = "https://ipfs.io/ipfs/QmXYQK2pARqieg4E6KJLB5LmJB1LxYTeQyLDieoihP3SWu/";
string const PATIENT_BASE = "https://ipfs.io/ipfs/QmfLh2PefnjdGSQ4Qp7S4Z3jofgDwtRZNxrGwndwFgWKMU/";

void buildFolder(string folderPath)
{
    mkdir(folderPath.c_str(), S_IRUSR | S_IWUSR | S_IXUSR | S_IRWXG | S_IRWXO);
}

void writeJsonData(fstream &file, int cur, string operationType, string url)
{
    file << "{" << endl;

    file << "\t\"name\": \"" << operationType << " account #" << cur << "\"," << endl;
    file << "\t\"description\" : \"This is a " << operationType << " account for Tiramisu\"," << endl;
    file << "\t\"image\": \"" << url << cur << ".png\"" << endl;
    file << "}" << endl;
}
int main()
{
    cout << "\n\n\n ===== Start build json file. =====\n\n\n";
    for (int operation = 0; operation <= 1; operation++)
    {
        string operationType, baseUrl;
        int execTimes;

        // set variable
        if (operation == 0)
        {
            operationType = "medical";
            baseUrl = MEDICAL_BASE;
            execTimes = MEDICAL_ACCOUNT;
        }
        else
        {
            operationType = "patient";
            baseUrl = PATIENT_BASE;
            execTimes = PATIENT_ACCOUNT;
        }

        string folderPath = operationType;
        buildFolder(folderPath);

        for (int cur = 0; cur < execTimes; cur++)
        {

            string curFile = "/" + to_string(cur) + ".json";
            string filePath = folderPath + curFile;

            fstream newFile;
            newFile.open(filePath, ios::out);

            writeJsonData(newFile, cur, operationType, baseUrl);

            newFile.close();
        }
        cout << operationType << " done.\n";
    }
    cout << "\n\n\n ===== Done build json file. =====\n\n\n";
    return 0;
}