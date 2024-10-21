### main page
```
    http://localhost:8082/chapters/1/terms
```

## Find by chapter
```
    http://localhost:8082/chapters/1/terms?page=1&size=1
```
Answer example: 
```json
{
  "id": 1,
  "china": "異體11",
  "english": "engl1",
  "russian": "русс5",
  "transcription": "ausaw`as",
  "termPage": {
    "pageable": {
      "pageNumber": 0,
      "pageSize": 15,
      "sort": {
        "sorted": false,
        "empty": true,
        "unsorted": true
      },
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "terms": [
      {
        "id": 53,
        "china": "分析",
        "english": "analysis",
        "russian": "анализ",
        "transcription": "fēnxī",
        "chapterId": 1
      },
      {
        "id": 55,
        "china": "拱",
        "english": "arch, bow, rampant",
        "russian": "арка",
        "transcription": "gong",
        "chapterId": 1
      },
      {
        "id": 56,
        "china": "拱廊",
        "english": "arcade",
        "russian": "аркада",
        "transcription": "gǒngláng",
        "chapterId": 1
      },
      {
        "id": 57,
        "china": "配件",
        "english": "armature, carcase, fittings, fixtures, mountings, reinforcement (reinforced concrete or reinforced brick)",
        "russian": "арматура",
        "transcription": "pèijiàn",
        "chapterId": 1
      },
      {
        "id": 58,
        "china": "加强",
        "english": "reinforcement",
        "russian": "армирование",
        "transcription": "jiāqiáng",
        "chapterId": 1
      },
      {
        "id": 59,
        "china": "建筑师",
        "english": "architect, civil architect",
        "russian": "архитектор",
        "transcription": "jiànzhùshī",
        "chapterId": 1
      },
      {
        "id": 60,
        "china": "架构",
        "english": "architecture",
        "russian": "архитектура",
        "transcription": "jiàgòu",
        "chapterId": 1
      },
      {
        "id": 54,
        "china": "圆形剧场",
        "english": "arena",
        "russian": "арена2",
        "transcription": "yuánxíngjùchàng",
        "chapterId": 1
      },
      {
        "id": 80,
        "china": "圆形剧场",
        "english": "arena",
        "russian": "арена3",
        "transcription": "yuánxíngjùchàng",
        "chapterId": 1
      },
      {
        "id": 81,
        "china": "圆形剧场",
        "english": "arena",
        "russian": "арена3",
        "transcription": "yuánxíngjùchàng",
        "chapterId": 1
      },
      {
        "id": 82,
        "china": "圆形剧场",
        "english": "arena",
        "russian": "арена3",
        "transcription": "yuánxíngjùchàng",
        "chapterId": 1
      },
      {
        "id": 83,
        "china": "圆形剧场",
        "english": "arena",
        "russian": "арена3",
        "transcription": "yuánxíngjùchàng",
        "chapterId": 1
      },
      {
        "id": 87,
        "china": "圆形剧场",
        "english": "arena",
        "russian": "арена3",
        "transcription": "yuánxíngjùchàng",
        "chapterId": 1
      },
      {
        "id": 112,
        "china": "露天圆形剧场",
        "english": "amphitheatre",
        "russian": "амфитеатр",
        "transcription": "lùtiānjùchàng",
        "chapterId": 1
      },
      {
        "id": 113,
        "china": "分析",
        "english": "analysis",
        "russian": "анализ",
        "transcription": "fēnxī",
        "chapterId": 1
      }
    ],
    "totalElements": 22
  }
}
```
Dto:
```java
    public class ChapterResponse {
    
        public Long id;
        public String china;
        public String english;
        public String russian;
        public String transcription;
        public TermPage termPage;
    }
```

## find by params
```
    http://localhost:8082/chapters/1/terms/find?part=арх&lang=ru&page=1&size=1
```

```json
{
  "pageable": {
    "pageNumber": 0,
    "pageSize": 15,
    "sort": {
      "sorted": false,
      "empty": true,
      "unsorted": true
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "terms": [
    {
      "id": 114,
      "china": "圆形剧场",
      "english": "arena",
      "russian": "арена",
      "transcription": "yuánxíngjùchàng",
      "chapterId": 1
    },
    {
      "id": 54,
      "china": "圆形剧场",
      "english": "arena",
      "russian": "арена2",
      "transcription": "yuánxíngjùchàng",
      "chapterId": 1
    },
    {
      "id": 87,
      "china": "圆形剧场",
      "english": "arena",
      "russian": "арена3",
      "transcription": "yuánxíngjùchàng",
      "chapterId": 1
    },
    {
      "id": 81,
      "china": "圆形剧场",
      "english": "arena",
      "russian": "арена3",
      "transcription": "yuánxíngjùchàng",
      "chapterId": 1
    },
    {
      "id": 80,
      "china": "圆形剧场",
      "english": "arena",
      "russian": "арена3",
      "transcription": "yuánxíngjùchàng",
      "chapterId": 1
    },
    {
      "id": 83,
      "china": "圆形剧场",
      "english": "arena",
      "russian": "арена3",
      "transcription": "yuánxíngjùchàng",
      "chapterId": 1
    },
    {
      "id": 82,
      "china": "圆形剧场",
      "english": "arena",
      "russian": "арена3",
      "transcription": "yuánxíngjùchàng",
      "chapterId": 1
    },
    {
      "id": 55,
      "china": "拱",
      "english": "arch, bow, rampant",
      "russian": "арка",
      "transcription": "gong",
      "chapterId": 1
    },
    {
      "id": 115,
      "china": "拱",
      "english": "arch, bow, rampant",
      "russian": "арка",
      "transcription": "gong",
      "chapterId": 1
    },
    {
      "id": 116,
      "china": "拱廊",
      "english": "arcade",
      "russian": "аркада",
      "transcription": "gǒngláng",
      "chapterId": 1
    },
    {
      "id": 56,
      "china": "拱廊",
      "english": "arcade",
      "russian": "аркада",
      "transcription": "gǒngláng",
      "chapterId": 1
    },
    {
      "id": 117,
      "china": "配件",
      "english": "armature, carcase, fittings, fixtures, mountings, reinforcement (reinforced concrete or reinforced brick)",
      "russian": "арматура",
      "transcription": "pèijiàn",
      "chapterId": 1
    },
    {
      "id": 57,
      "china": "配件",
      "english": "armature, carcase, fittings, fixtures, mountings, reinforcement (reinforced concrete or reinforced brick)",
      "russian": "арматура",
      "transcription": "pèijiàn",
      "chapterId": 1
    },
    {
      "id": 58,
      "china": "加强",
      "english": "reinforcement",
      "russian": "армирование",
      "transcription": "jiāqiáng",
      "chapterId": 1
    },
    {
      "id": 118,
      "china": "加强",
      "english": "reinforcement",
      "russian": "армирование",
      "transcription": "jiāqiáng",
      "chapterId": 1
    }
  ],
  "totalElements": 32
}

```
Dto:
```java
    public class TermPage {
    
        public Pageable pageable;
        public List<TermResponse> terms;
        public Long totalElements;
    }
    
    public class TermResponse {
    
        public Long id;
        public String china;
        public String english;
        public String russian;
        public String transcription;
        public Long chapterId;
    }
```
