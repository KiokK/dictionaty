package by.kiok.dictionary.exexception;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }

    public static NotFoundException byId(Long id) {
        return new NotFoundException("Entity by id: '" + id + "' not found");
    }

    public static NotFoundException byWord(String word) {
        return new NotFoundException("Entity by word: '" + word + "' not found");
    }
}
