package by.kiok.dictionary.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChapterRequest {

    public String china;
    public String english;
    public String russian;
    public String transcription;
}
