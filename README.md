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

### 1. Sign

- ``회원가입`` ``로그인``을 할 수 있다.

### 2. 친구 추가 :couple:

- ``닉네임``을 검색해 해당 유저 목록을 제공 받을 수 있다.
- 친구 요청을 할 수 있다.
- 요청을 ``수락, 거절`` 할 수 있다.

### 3. 알람 :bell:

- 친구 ``수락`` ``거절`` ``확인`` 알람을 받을 수 있다.

### 4. 프로필 :smile:

- 친구 목록에 있는 ``li Card``를 클릭 해 확인 할 수 있다.
- Header에 있는 ``내 정보``를 클릭 해 확인 할 수 있다.
- ``내 프로필에 이미지를 클릭 해 이미지를 수정 할 수 있다.``

### 5. 방 :game_die:

* #### 5.1 방 생성

  - 방 제목 작성할 수 있다.
  - 계획 ``당 일``과 ``마지막 일`` 기간을 정할 수 있다.
  - 계획 장소를 지정할 수 있다.
  - 친구 목록을 통해 멤버를 추가 할 수 있다.
  - 일정 수 만큼 Detail room이 생성된다.
 
* #### 5.2 방 메인

  - 멤버 목록을 확인 할 수 있다.
  - 계획 일정을 확인 할 수 있다.
 
* #### 5.3 채팅 :speech_balloon:

  - ``멤버끼리 채팅을 할 수 있다.``

* #### 5.4 장소

  - ``모임 장소를 확인 할 수 있다.``

### 6. 일정 ( Detail ) :calendar:

- 방 메인의 일정들을 클릭 해 확인 할 수 있다.
- ``방장이 제목, 각 시간의 세부 일정을 수정 할 수 있다.``

<br />

## :pencil2: 구현

### 1. Routing

- ``react-router-dom을 사용해 Page Routing을 했습니다.``
- ``Route태그``를 나누어 ``User`` ``NonUser`` ``Schedule`` ``NoMatch`` 라우팅을 따로 해주었습니다.
- 각 ``라우팅 컴포넌트``로 따로 빼 ``UseEffect를 사용해 초기 state``를 관리해주었습니다.

### 2. Firebase

* db 구조, image url 어떻게 저장되는지, 채팅 db 구조

* Storage - ``User Profile Image`` 관리
* Realtime Database - ``채팅 내역`` 관리
* Firestore - ``User, Room 데이터베이스`` 관리

### 3. Recoil

* 상태 저장 라이브러리인 Recoil을 사용해 전역적으로 관리했습니다.
* ``User`` ``Room``의 state를 관리해주었습니다.

### 4. API

* API 호출은 ``axios`` 라이브러리를 사용했습니다.

### 5. Sign

 * #### 5.1 구조

   - firebase 고유 key값으로 감싸져있습니다. ex) -NicC90trwosLIz8haw7
   - ``IUserInfo`` : ``email`` ``IFriendInfo[]`` ``IAlarm[]`` ``uuid`` ``image`` ``name`` ``nickname`` ``password``로 구성되어있습니다.

 * #### 5.2 sign up

   - ``isValidationCheck``라는 이메일 형식이나, input value의 length를 체크하는 함수를 만들어 boolean을 반환하도록 했습니다.
   - ``ErrorMessage``라는 형식의 에러를 나타내는 컴포넌트를 만들어 input state가 변경될 때 마다 <br /> ``display style``을 바꿔주어 실시간 반응 UI로 만들어주었습니다.
   - 회원가입 성공 시 ``uuid``라는 라이브러리를 사용해 ``user database id``에 고유한 값을 넣어주었습니다.
     
 * #### 5.3 sign in

   - 로그인 성공 시 ``localStorage``에 id를 저장해 사용했습니다. ( 새로고침 방지 )
   - 성공 후 ``UserRouter 컴포넌트``에 접근해 id를 갖고, ``getMyInfoApi``를 호출해 초기 state를 가공해주었습니다.
   - Application의 localStorage의 값을 임의로 바꿀 시 ``잘못된 접근`` 처리를 해주었습니다.
  
### 6. Friends

 * #### 6.1 구조

   - ``IFriendInfo`` : ``email`` ``id`` ``image`` ``name`` ``nickname``

 * #### 6.2 Friends List

   - ``Recoil IUserInfo state``를 불러와 그 안에 friend 객체배열을 map으로 뿌려주었습니다. 

 * #### 6.3 User Search

   - UseQuery를 사용해 ``userSearchApi``를 호출 후 데이터(list)를 가공을 해주었습니다.
   - filter를 사용해 이미 친구추가가 되어 있는지, 본인인지 필터링 해주었습니다.
   - 가공한 ``IUserInfo`` 객체배열을 map으로 뿌려주었습니다.

 * #### 6.4 Friend request

   - 가공한 List의 card를 클릭 시 ``alarmPushApi``를 호출 해 받는 user의 알람에 추가되도록 했습니다.
   - api를 호출하기 전, 이미 요청을 보냈는 지, 받는 user alarm 객체의 type을 필터링해 <br /> 중복요청 방지를 해주었습니다.

### 7. Alarm

 * #### 7.1 구조

   - ``IAlarm`` : ``email`` ``message`` ``nickname`` ``type`` ``uuid`` ``create_at``
   - Type: ``'friendRequest' | 'friendRequestRefusal' | 'invite'``
  
 * #### 7.2 Alarms list

   - ``Recoil IUserInfo state``를 불러와 그 안에 alarm 객체배열을 map으로 뿌려주었습니다.
   - Type에 따라 맞는 형식으로 UI를 제공했습니다. 

 * #### 7.2 Accept friend request

   - 친구 요청을 수락했을 시, ``addFriendApi`` 함수를 호출했습니다.
   - ``Promise.all``을 사용해 ``내 user의 friend 객체 추가`` ``상대 user의 friend 객체 추가`` 작업을 병렬적으로 수행해줬습니다.
 
 * #### 7.3 Refusal friend request

   - 친구 요청을 거절했을 시, ``alarmPushApi``를 호출 해 ``friendRequestRefusal`` 타입으로 <br /> 상대 user alarm 객체에 거절 알람을 추가를 해줬습니다.

 * #### 7.3 invite

   - 방을 생성할 때 친구를 초대 했을 시, ``alarmPushApi``를 호출 해 ``invite`` 타입으로 <br /> 각 멤버들에게 친구 초대 알람을 추가 해줬습니다.

### 8. Profile

 * #### 8.1 구조

   - ``image`` ``nickname`` ``email`` ``name``
  
 * #### 8.2 member, friend profile

   - ``IFriendInfo`` 타입으로 props를 받아 UI를 제공해주었습니다.

 * #### 8.3 my profile

   - ``IUserInfo`` 타입으로 props를 받아 사용했습니다.
   - ``image``를 클릭했을 시 file type의 input을 간접적으로 열 수 있도록 했습니다.
   - ``새로운 image를 업로드`` 했을 시 ``기존 image의 src와 비교``하여 ``수정하기`` ``수정취소`` 버튼 UI를 제공해주었습니다.

### 9. Room

 * #### 9.1 구조

   - ``IRoomInfo`` : ``uuid`` ``title`` ``admin`` ``ILocation`` ``IMemberInfo[]`` ``IDateDetail[]`` ``ITalk[]`` ``create_at`` ``dDay``
   - ``ILocation`` : ``placeName`` ``lat`` ``lng``
   - ``IMemberInfo`` : ``IFriendInfo`` ``class``
   - ``IDateDetail`` : ``id`` ``dateDetail`` ``subTitle`` ``IDateDetailContent[]``
   - ``ITalk`` : ``message`` ``nickname`` ``date``
   - ``IDateDetailContent`` : ``id`` ``hour`` ``text``

 * #### 9.2 Create room

   - 9.2.1 일정 (date)

     - ``react-datepicker`` 라이브러리를 사용했습니다.
     - ``startDate`` ``endDate``의 차이 일 수 만큼 ``IDateDetail`` 객체를 생성해주었습니다.
    
   - 9.2.2 Map

     - ``KAKAOMAP API`` 라이브러리를 사용했습니다.
     - ``Marker`` : ``id`` ``position: lat, lng`` ``content``
     - 장소를 검색 시 ``kakao.maps.services.Places()``의 ``keywordSearch`` 함수를 사용해 ``좌표`` ``주소 이름`` ``상호명``을<br /> 알아내 ``Marker`` 객체에 담아 Map에 찍어주었습니다.
     - Map을 클릭 시  ``kakao.maps.event.MouseEvent``의 좌표를 받아 ``geocoder.coord2Address`` 주소 변환 함수를 사용해 <br /> ``Marker`` 객체에 담아 Map에 찍어주었습니다.

   - 9.2.3 Invite
  
     - input 의 ``checkbox type``으로 내 friends list를 체크할 때마다 ``IFriendInfo`` 객체를 state에 저장했습니다.
     - 그 객체를 담은 state에 ``class`` 객체를 추가해 ``IMemberInfo`` 타입으로 재 가공해주었습니다.
 
 * #### 9.3 Main room

   - URL : ``domain/schedule/email/uuid``
   - Main room에 접근 시 ``useLocation().pathname.split()``을 사용해 ``uuid``를 추출했습니다.
   - 추출한 uuid를 사용해 ``getMyRoomInfoApi`` api를 호출 해 ``Recoil roomInfo state`` 초기 상태를 가공해주었습니다.

 * #### 9.4 Chatting

   - 9.4,1 Get messages

     - ``useEffect``로 마운트 되기 전 ``getMessageApi``를 호출 해 초기 상태를 가공해주었습니다.
     - firestore의 ``collection``함수를 호출해 Chat db path를 알아내고 ``query``함수의 2번쨰 인자로 ``orderBy('sentAt','asc')`` 통해 Chat db를 정렬해줬습니다.
     - ``getDocs`` 함수를 호출해 Chat의 ``DocumentData[]``을 제공 받고 ``IChat[]`` 타입으로 재 가공해주었습니다.

   - 9.4.2 Push message
  
     - ``collection`` 함수를 호출해 Chat db path를 알아내고 ``addDoc`` 함수를 통해 ``IChat`` 타입의 객체를 Chat db에 저장했습니다.

   - 9.4.3 Real time chatting
  
     - ``collection db path``를 갖고, ``onSnapshot``함수를 호출해 새로운 ``데이터가 저장된 것을 감지``하고 새로운 chat ``DocumentData``을 받아 ``기존 chat state에 저장해 업데이트`` 해주었습니다.
 
 * #### 9.5 Place

   - 

### 10. Detail room


### 100. ETC

  * #### 100.1 Loading
  * #### 100.2 Modal
  * #### 100.3 Toast
  * #### 100.4 Disable


<br />

## :blush: 느낀 점
처음에 json-parse라는 가짜 디비서버를 사용했음 <br />
firebase database가 배열 ( 대괄호 ) 를 인식하지 못해 애먹음 <br />
객체안에 객체 <br />
recoil을 쓰지않고, useLocation를 사용했을 때 <br />

