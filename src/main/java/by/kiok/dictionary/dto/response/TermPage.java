package by.kiok.dictionary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TermPage {

    public Pageable pageable;
    public List<TermResponse> terms;
    public Long totalElements;
}
