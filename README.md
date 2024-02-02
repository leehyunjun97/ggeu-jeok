## :memo: GGEU-JEOK

한 마디, 한 마디 끄적임을 모아 계획 일정을 조정하는 웹 애플리케이션

<br/>

## :pager: 배포 페이지

[https://roaring-gumption-2cae99.netlify.app/](https://roaring-gumption-2cae99.netlify.app/) <br />

id: test@naver.com test2@naver.com test3@naver.com test4@naver.com <br />
password: 123456


<br/>

## :books: 기술 스택

> ``React.js`` ``TypeScript`` ``Recoil`` ``CSS`` ``Firebase``

<br />

## :eyes: 기능 및 UI

### 1. Sign

- ``회원가입`` ``로그인``을 할 수 있다.

![로그인](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/0a097dc2-61e3-4570-8283-d4be5c0519ed)
![회원가입](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/44dd6e10-926a-49bf-ba5f-27f7b1f7a7d4)

### 2. 친구 추가 :couple:

- ``닉네임``을 검색해 해당 유저 목록을 제공 받을 수 있다.
- 친구 요청을 할 수 있다.
- 요청을 ``수락, 거절`` 할 수 있다.

![친구추가sizedown](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/e5e37844-c09d-4dd6-ae90-f843143121e4)

### 3. 알람 :bell:

- 친구 ``수락`` ``거절`` ``확인`` 알람을 받을 수 있다.
- ``방 생성`` 알람을 받을 수 있다.

![알람](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/4fca0371-a10c-4961-a782-cb3eb381582b)


### 4. 프로필 :smile:

- 친구 목록에 있는 ``li Card``를 클릭 해 확인 할 수 있다.
- Header에 있는 ``내 정보``를 클릭 해 확인 할 수 있다.
- ``내 프로필에 이미지를 클릭 해 이미지를 수정 할 수 있다.``

![프로필1](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/d0ad8cdb-2f20-40d2-aaac-272771f2bb39)
![프로필2](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/40165292-c545-4235-ab16-1d066317b6db)


### 5. 방 :game_die:

* #### 5.1 방 생성

  - 방 제목 작성할 수 있다.
  - 계획 ``당 일``과 ``마지막 일`` 기간을 정할 수 있다.
  - 계획 장소를 지정할 수 있다.
  - 친구 목록을 통해 멤버를 추가 할 수 있다.
  - 일정 수 만큼 Detail room이 생성된다.
 
  ![방생성](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/d441ab25-9fa6-4af2-a86d-281b012fd0aa)
  ![방생성_지도](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/27910c1e-6a39-4baa-9d1a-e4ee7236fba3)
 
* #### 5.2 방 메인

  - 멤버 목록을 확인 할 수 있다.
  - 계획 일정을 확인 할 수 있다.
  
  ![방 메인](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/e559c772-1b05-4abb-9e57-502fd9d50a9c)
 
* #### 5.3 채팅 :speech_balloon:

  - ``멤버끼리 채팅을 할 수 있다.``

  ![채팅](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/882899ba-4c0e-4e15-93ea-44b38c411b1d)


* #### 5.4 장소

  - ``모임 장소를 확인 할 수 있다.``

### 6. 일정 ( Detail ) :calendar:

- 방 메인의 일정들을 클릭 해 확인 할 수 있다.
- ``방장이 제목, 각 시간의 세부 일정을 수정 할 수 있다.``

  ![방세부일정](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/19281c19-d2a7-41c7-ba12-62e85b141396)

<br />

## ETC

### 1. 코드 리뷰
![PR](https://github.com/leehyunjun97/ggeu-jeok/assets/130208301/a70051d1-f66b-434a-b7a9-d9e612e2dd32) <br />
리뷰를 통해 코드 개선을 노력했습니다.

<br />


## :blush: 느낀 점
프로젝트를 계획할 때 초반 설계가 중요하다고 느꼈습니다. <br />
초반 설계와는 달리 기능이 추가되거나, 제거되면서 데이터 구조를 여러 번 바꿔 코드를 전면적으로 수정했던 적이 있었습니다. <br />
비 관계형DB의 데이터 구조에 대해서 어떻게 하면 데이터가 중복적이지 않고 잘 가공해서 사용할 수 있을까에 대해서 많은 고민을 했습니다. <br />
그리고 각각 공통, 개별된 컴포넌트를 나누면서 폴더 구조의 가시성이나 재활용등 리액트의 이 점을 많이 살리지 못한 것 같아 <br /> 아쉬움이 느껴졌습니다. <br />
함수명이나 변수명등을 어떻게 지으면 좀 더 한번에 알아볼 수 있을까, 중복된 다른 함수가 없는지 많은 고민을 했습니다. <br />
타입을 지정해주면서 함수나 객체를 생성할 때 어떤 타입, 반환값인지 명확하게 인지 할 수 있어서 코드를 작성하는데 효율적이었습니다. <br />
장소 기능으로 사용된 kakaomap api를 사용하면서, 어떻게 하면 이 프로젝트에 나만의 코드로써 잘 녹여낼 수 있을까 시도했던 것 같습니다. <br />
구글링, stackoverflow, gpt 등 많은 도움을 받았고, 하나의 정보가 아닌 여러 정보를 찾고 받아들여 나만의 코드로 만들기 위해 노력했던 것 같습니다. <br />
진행하면서, 지금 내가 이런 방향으로 만들고 있는 것이 맞는 것인지 계속 의문이 들었습니다. <br />
주변 프론트엔드 지인에게 코드 리뷰도 받아보고, 여러 코드들을 접하면서 코드의 개선을 위해 노력했던 것 같습니다. <br />
향후 스마트폰에서도 보기 편하도록 반응형 UI로 수정하거나, 채팅 데이터를 가공하여 바로 계획을 세울 수 있도록 하면 좋을 것 같습니다. 

첫 프로젝트의 아쉬운 점을 바로 메우지 못하고 진행 도중 깨우친 적이 정말 많았던 것 같습니다. <br />
그 격차를 좁히기 위해 많은 프로젝트 경험이나 다른 프로그래머들의 코드들을 접할 필요가 있다고 느껴졌습니다.
