package by.kiok.dictionary.mapper;

import by.kiok.dictionary.dto.PrincipalUser;
import by.kiok.dictionary.dto.UserDto;
import by.kiok.dictionary.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserDto userToUserDto(User user);

    PrincipalUser userToPrincipalUser(User user);
}
