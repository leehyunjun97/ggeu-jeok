## :memo: GGEU-JEOK

한 마디, 한 마디 끄적임을 모아 계획 일정을 조정하는 웹 애플리케이션

<br/>

## :pager: 배포 페이지

공백

<br/>

## :books: 기술 스택

> ``React.js`` ``TypeScript`` ``Recoil`` ``CSS`` ``Firebase``

<br/>

## :eyes: 기능 및 UI

#### 1. Sign

- ``회원가입`` ``로그인``을 할 수 있다.

#### 2. 친구 추가 :couple:

- ``닉네임``을 검색해 해당 유저 목록을 제공 받을 수 있다.
- 친구 요청을 할 수 있다.
- 요청을 ``수락, 거절`` 할 수 있다.

#### 3. 알람 :bell:

- 친구 ``수락`` ``거절`` ``확인`` 알람을 받을 수 있다.

#### 4. 프로필 :smile:

- 친구 목록에 있는 ``li Card``를 클릭 해 확인 할 수 있다.
- Header에 있는 ``내 정보``를 클릭 해 확인 할 수 있다.
- ``내 프로필에 이미지를 클릭 해 이미지를 수정 할 수 있다.``

#### 5. 방 :game_die:

* #### 5.1 방 생성

  - 방 제목 작성할 수 있다.
  - 계획 ``당 일``과 ``마지막 일`` 기간을 정할 수 있다.
  - 계획 장소를 지정할 수 있다.
  - 친구 목록을 통해 멤버를 추가 할 수 있다.
 
* #### 5.2 방 메인

  - 멤버 목록을 확인 할 수 있다.
  - 계획 일정을 확인 할 수 있다.
 
* #### 5.3 채팅 :speech_balloon:

  - ``멤버끼리 채팅을 할 수 있다.``


#### 6. 일정 ( Detail ) :calendar:

- 방 메인의 일정들을 클릭 해 확인 할 수 있다.
- ``방장이 제목, 각 시간의 세부 일정을 수정 할 수 있다.``

<br />

## :pencil2: 구현

#### 1. Routing

- ``react-router-dom을 사용해 Page Routing을 했습니다.``
- ``Route태그``를 나누어 ``User`` ``NonUser`` ``Schedule`` ``NoMatch`` 라우팅을 따로 해주었습니다.
- 각 ``라우팅 컴포넌트``로 따로 빼 ``UseEffect를 사용해 초기 state``를 관리해주었습니다.

#### 2. Firebase

* Storage: ``User Profile Image`` 관리
* Realtime Database: ``채팅 내역`` 관리
* Firestore: ``User, Room 데이터베이스`` 관리

#### 3. Recoil

* 상태 저장 라이브러리인 Recoil을 사용해 전역적으로 관리했습니다.
* ``User`` ``Room``의 state를 관리해주었습니다.

#### 4. Sign

 * #### 4.1 회원가입

   - ``isValidationCheck``라는 이메일 형식이나, input value의 length를 체크하는 함수를 만들어 boolean을 반환하도록 했습니다.
   - ``ErrorMessage``라는 형식의 에러를 나타내는 컴포넌트를 만들어 input state가 변경될 때 마다 <br /> display style을 바꿔주어 실시간 반응 UI로 만들어주었습니다.
   - 회원가입 성공 시 uuid라는 라이브러리를 사용해 user database id에 고유한 값을 넣어주었습니다.
     
 * #### 4.2 로그인

   - 로그인 성공 시 localStorage에 id를 저장해 사용했습니다. ( 새로고침 방지 )
   - 성공 후 ``UserRouter 컴포넌트``에 접근해 id를 가지고, ``getMyInfoApi``를 호출해 초기 state를 가공해주었습니다.
   - Application의 localStorage의 값을 임의로 바꿀 시 ``잘못된 접근`` 처리를 해주었습니다.
  
#### 5. 

 * #### 5.1 


#### 3. Sign
#### 3. Sign
#### 3. Sign
#### 3. Sign

### 100. ETC

  * #### 100.1 Loading
  * #### 100.2 Modal
  * #### 100.3 Toast
  * #### 100.4 Disable


<br />

## :blush: 느낀 점
처음에 json-parse라는 가짜 디비서버를 사용했음 <br />
firebase database가 배열 ( 대괄호 ) 를 인식하지 못해 애먹음
