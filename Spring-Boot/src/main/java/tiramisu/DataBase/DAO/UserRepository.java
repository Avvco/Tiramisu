package tiramisu.DataBase.DAO;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

import tiramisu.DataBase.DTO.User;

@Repository
public class UserRepository implements IUserRepository {

  @Override
  public List<User> findAll() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public List<User> findAll(Sort sort) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public List<User> findAllById(Iterable<Integer> ids) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public <S extends User> List<S> saveAll(Iterable<S> entities) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public void flush() {
    // TODO Auto-generated method stub
    
  }

  @Override
  public <S extends User> S saveAndFlush(S entity) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public <S extends User> List<S> saveAllAndFlush(Iterable<S> entities) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public void deleteAllInBatch(Iterable<User> entities) {
    // TODO Auto-generated method stub
    
  }

  @Override
  public void deleteAllByIdInBatch(Iterable<Integer> ids) {
    // TODO Auto-generated method stub
    
  }

  @Override
  public void deleteAllInBatch() {
    // TODO Auto-generated method stub
    
  }

  @Override
  public User getOne(Integer id) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public User getById(Integer id) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public User getReferenceById(Integer id) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public <S extends User> List<S> findAll(Example<S> example) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public <S extends User> List<S> findAll(Example<S> example, Sort sort) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public <S extends User> S save(S entity) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Optional<User> findById(Integer id) {
    // TODO Auto-generated method stub
    return Optional.empty();
  }

  @Override
  public boolean existsById(Integer id) {
    // TODO Auto-generated method stub
    return false;
  }

  @Override
  public long count() {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public void deleteById(Integer id) {
    // TODO Auto-generated method stub
    
  }

  @Override
  public void delete(User entity) {
    // TODO Auto-generated method stub
    
  }

  @Override
  public void deleteAllById(Iterable<? extends Integer> ids) {
    // TODO Auto-generated method stub
    
  }

  @Override
  public void deleteAll(Iterable<? extends User> entities) {
    // TODO Auto-generated method stub
    
  }

  @Override
  public void deleteAll() {
    // TODO Auto-generated method stub
    
  }

  @Override
  public Page<User> findAll(Pageable pageable) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public <S extends User> Optional<S> findOne(Example<S> example) {
    // TODO Auto-generated method stub
    return Optional.empty();
  }

  @Override
  public <S extends User> Page<S> findAll(Example<S> example, Pageable pageable) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public <S extends User> long count(Example<S> example) {
    // TODO Auto-generated method stub
    return 0;
  }

  @Override
  public <S extends User> boolean exists(Example<S> example) {
    // TODO Auto-generated method stub
    return false;
  }

  @Override
  public <S extends User, R> R findBy(Example<S> example, Function<FetchableFluentQuery<S>, R> queryFunction) {
    // TODO Auto-generated method stub
    return null;
  }

}
