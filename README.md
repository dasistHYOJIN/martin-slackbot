# Martin Bot, the slack bot
![martin-bot-img](https://user-images.githubusercontent.com/25656510/64355809-ce580180-d03c-11e9-94a1-91cc3f24aea5.png)
### 소개
우아한테크코스 1기의 크루인 마틴을 따라하는 슬랙봇.

### 구현 기능 계획
1. ~~슬랙의 채널 및 DM에 초대하면 일정 확률로 맞장구를 친다.~~
    * ~~출력 예시: 마자마자~, 그럼그럼~, 그럴 수 있지~, …(대꾸 안 하는 중)~~
2. 기온에 따라 맞장구의 확률이 달라질 수 있다.
    * 마틴은 땀 나는 걸 싫어한다.
3. 분위기는 파악하고 맞장구를 친다.
    * 의문문이나 평서문정도는 구분할 수 있도록
4. 술을 마시면 말이 많아진다.
    * 불금의 시간이 되면 맞장구를 좀 더 자주 칠 수 있다.
    
### 사용한 라이브러리
* request: HTTP 네트워크 라이브러리

### 참고 사이트
* [Enabling interactions with bots - Slack API](https://api.slack.com/bot-users)