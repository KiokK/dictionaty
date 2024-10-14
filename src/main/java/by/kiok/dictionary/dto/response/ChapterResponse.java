package by.kiok.dictionary.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterResponse {

    public Long id;
    public String china;
    public String english;
    public String russian;
    public String transcription;
    public TermPage termPage;
}