package by.kiok.dictionary.service.impl;

import by.kiok.dictionary.dto.CredentialsDto;
import by.kiok.dictionary.dto.PrincipalUser;
import by.kiok.dictionary.dto.UserDto;
import by.kiok.dictionary.mapper.UserMapper;
import by.kiok.dictionary.model.User;
import by.kiok.dictionary.repository.UserRepository;
import by.kiok.dictionary.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

//    @Override
//    public UserPageDto findAll(Pageable pageable) {
//        List<User> users = userRepository.findAll(pageable).toList();
//
//        return userMapper.userListToUserPageDto(users, pageable);
//    }
//
//    @Override
//    public UserResponseDto findById(long id) throws EntityNotFoundException{
//        return userRepository.findById(id)
//                .map(userMapper::userToUserResponseDto)
//                .orElseThrow(() -> new EntityNotFoundException(String.valueOf(id)));
//    }

    @Override
    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByUsername(credentialsDto.getUsername())
                .orElseThrow(() -> new RuntimeException("Unknown user" + HttpStatus.NOT_FOUND));

//        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
        return userMapper.userToUserDto(user);
//        }
//        throw new RuntimeException("Invalid password "+ HttpStatus.BAD_REQUEST);
    }

    @Override
    public PrincipalUser findByUsername(String username) throws EntityNotFoundException {
        return userRepository.findByUsername(username)
                .map(userMapper::userToPrincipalUser)
                .orElseThrow(() -> new EntityNotFoundException(String.valueOf(username)));
    }

//    @Override
//    @Transactional
//    public UserResponseDto update(long id, UserRequestDto userRequestDto) throws EntityNotFoundException {
//        User currentUser = userRepository.findById(id)
//                .orElseThrow(() -> new EntityNotFoundException(String.valueOf(id)));
//
//        User updateUser = userMapper.updateUser(currentUser, userRequestDto);
//        updateUser = userRepository.save(updateUser);
//
//        return userMapper.userToUserResponseDto(updateUser);
//    }
}
