자동완성

1. factor

   - 검색된 단어가 얼마나 많이 사용되는가?
   - 얼마나 많은 유저들이 클릭해 검색된 결과에 만족하는가?

2. 가중치(weight) 분류

   - 검색수 : 50%
   - 만족수(검색된 결과를 클릭했을때 만족수 증가) : 50%
   - 가중치 => (검색수 _ 0.5) + (만족수 _ 0.5)

3. 시스템

   - 몽고DB
   - AWS 람다

4. 기능

   - 입력한 키워드 자동완성
   - 클릭수,만족수 카운팅(UPDATE)
   - 특정시간에 가중치 재산출
   - 가중치 강제 변경
   - 검색 키워드는 2~7글자 사이

5. Data Field

   - category : STR (INDEX)
   - keyword : STR (INDEX)
   - weight : NUMBER (INDEX)
   - shard : NUMBER (0~23)
   - searchCount : NUMBER
   - satisfactionCount : NUMBER
   - force : Boolean
