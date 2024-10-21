package by.kiok.dictionary.service;

import by.kiok.dictionary.dto.CredentialsDto;
import by.kiok.dictionary.dto.PrincipalUser;
import by.kiok.dictionary.dto.UserDto;
import jakarta.persistence.EntityNotFoundException;

public interface UserService {

    UserDto login(CredentialsDto credentialsDto);//throws;

    PrincipalUser findByUsername(String username) throws EntityNotFoundException;

}
