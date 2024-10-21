package by.kiok.dictionary.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PrincipalUser implements Serializable {

    private String username;
    private String role;
}
