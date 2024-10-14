package by.kiok.dictionary.service;

import by.kiok.dictionary.dto.CredentialsDto;
import by.kiok.dictionary.dto.PrincipalUser;
import by.kiok.dictionary.dto.UserDto;
import jakarta.persistence.EntityNotFoundException;

public interface UserService {

//    UserPageDto findAll(Pageable pageable);

//    UserResponseDto findById(long id) throws EntityNotFoundException;

    UserDto login(CredentialsDto credentialsDto);//throws;

    PrincipalUser findByUsername(String username) throws EntityNotFoundException;

//    UserResponseDto update(long id, UserRequestDto userRequestDto) throws EntityNotFoundException;
}
