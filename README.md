# FASTFIVE 기업협업 3팀

## 🙂 프로젝트 소개

### 프로젝트 기간

- 2022.12.12 ~ 2022.12.27 (약 2주)
- <a href="http://13.231.5.51:3000/" target="_blank"> 배포 주소로 이동하기! </a>

### ⭐ 팀원 소개 및 담당 기능

### Front-end

- **박성아**
    - 서브홈 - 메인 페이지(/)
        - 메인 배너 한번에 2개로 노출 (화살표로 이동 가능, 반응형으로 제작 - 모바일 사이즈에서는 1개로 노출, 페이지네이션 포함)
        - 우리 회사 소개하기 버튼 - 게시글 작성 페이지 이동 (/postWritePage)
        - 업종별 살펴보기 - 12개의 카테고리가 버튼으로 노출 (클릭시, 하단에 해당 category_id의 회사만 표시, 바뀐 카테고리에 따라 타이틀 변경)
        - 회사 정보 카드들을 페이지네이션을 이용해서 한 페이지에 정해진 수량만큼 출력하는 리스트 형태로 구현
        - 전체보기 - 리스트 페이지로 이동 (/list)
    - 리스트 페이지 (/list)
        - 상단에서 버튼으로 지역, 카테고리를 기준으로 회사 정보 카드들을 필터링
        - 나머지 기능들은 서브홈과 동일
- **오다원**
    - 상세페이지(/detail/id)
    - 상세페이지 - 회사 상세 정보
        - 홈페이지 클릭 시 새 탭으로 페이지 이동
        - 이메일 클릭 시 ‘이메일이 복사되었습니다’ 토스트 문구 노출 및 이메일 복사
        - 파일 이름 클릭 시 파일 다운로드
    - 상세페이지 - 댓글
        - 댓글 및 답글(대댓글) 조회,작성,수정,삭제
        - 페이지네이션
- **한혜선**
    - 게시물 수정/등록 페이지(/postWrtiePage)
        - 업종 이중 카테고리
        - 회사이름 가져오기
        - 글자수 세기
        - 필수 항목 체크 alert
        - 주력 업무분야 5개 제한
        - 파일 업로드
        - 필수항목 & 체크박스 미입력 체크
        - 버튼 조건부 렌더링
        - 반응형 레이아웃 구현
    - header, footer, side bar 레이아웃
        - 반응형 레이아웃 구현

---

## 🤼 협업 툴 및 개발환경

### 협업 방식

- 노션에서 칸반보드와 타임라인을 이용하여 티켓으로 일정관리
- Daily Stand Up Meeting : 매일 오전 11시 30분에 30분간 미팅 진행
    - 어제까지 작업한 사항 공유 및 오늘 작업계획 공유
- Slack으로 공지사항 전달
- VSCode Live Share : 실시간 코드 공유 및 피드백

### 기능 구현 방식

- git, github, google meet, zoom을 사용하여 실시간으로 팀원간의 코드 리뷰를 진행하고 에러 및 충돌 해결

### 개발환경

- OS : Windows, Ubuntu, MacOS
- 언어 및 기술Stack : HTML, CSS, TypeScript, SCSS, React
- 형상관리 : Github
- 문서관리 : Notion
- 협업 : Slack, VSC(Live share)

---

## 😎 결과물

- 로그인 한 계정 (2개의 계정으로 로그인 가능하며 계정에 따라 보여지는 버튼이 있음)
    - member3@test.com / member3 (게시물 작성 가능)
    - member4@test.com / member4 (게시물 작성 불가)

### **서브홈 - 메인 페이지(/)**

- 메인 배너는 한번에 2개로 노출
- 화살표로 이동 가능하며 반응형으로 제작
- 모바일 사이즈에서는 이미지가 1개로 노출
- 페이지네이션 포함
    
    ![https://velog.velcdn.com/images/sonia0903/post/9a60453a-9434-4534-a9f8-7beaef53c918/image.gif](https://velog.velcdn.com/images/sonia0903/post/9a60453a-9434-4534-a9f8-7beaef53c918/image.gif)
    
- 우리 회사 소개하기 버튼 - 게시글 작성 페이지 이동 (/postWritePage)
- 업종별 살펴보기 - 전체 카테고리가 버튼으로 노출
- 클릭시, 하단에 해당 카테고리 아이디의 회사만 표시되고 바뀐 카테고리에 따라 타이틀 변경
    
    ![https://velog.velcdn.com/images/sonia0903/post/8a0e043d-6b3a-4564-921c-846401ec804a/image.gif](https://velog.velcdn.com/images/sonia0903/post/8a0e043d-6b3a-4564-921c-846401ec804a/image.gif)
    

- 회사 정보 카드들을 페이지네이션을 이용해서 한 페이지에 정해진 수량만큼 출력하는 리스트 형태로 구현
    
    ![https://velog.velcdn.com/images/sonia0903/post/bf977c46-5508-4b7d-8456-b014387c0ee8/image.gif](https://velog.velcdn.com/images/sonia0903/post/bf977c46-5508-4b7d-8456-b014387c0ee8/image.gif)
    
- 전체보기 - 리스트 페이지로 이동 (/list)

### **리스트 페이지 (/list)**

- 상단에서 버튼으로 지역과 카테고리 기준으로 회사 정보 카드들을 필터링
    
    ![https://velog.velcdn.com/images/sonia0903/post/63d2bbce-52b4-4cfa-838c-9c59b7520652/image.gif](https://velog.velcdn.com/images/sonia0903/post/63d2bbce-52b4-4cfa-838c-9c59b7520652/image.gif)
    

- 회사 카드를 클릭하면 디테일 페이지로 이동
    
    ![https://velog.velcdn.com/images/sonia0903/post/8ec66454-2e64-4b07-9c70-4e63de6ac6b8/image.gif](https://velog.velcdn.com/images/sonia0903/post/8ec66454-2e64-4b07-9c70-4e63de6ac6b8/image.gif)
    
- 그 외 기능들은 서브홈과 거의 유사함

---

### **게시물 등록/수정 페이지**

![image](https://user-images.githubusercontent.com/89020079/209654953-ab6d9772-b534-48c1-900b-c4cb3cddc935.png)

- 업종 이중 카테고리 : 카테고리를 클릭할 시 하위 상세카테고리가 존재할 때만 상세 카테고리가 생성됨.
- 회사이름 가져오기 : default value로 cms상 회사이름을 불러옴(수정가능)
- 글자수 세기 : 글자를 입력할 때마다 글자수가 카운트되고, 100자 혹은 1000자 조건에 따라 해당 제한 글자수에 도달하면, 영역이 빨간색으로 변경되며, 더이상 입력되지 않음.
- 필수 항목 : 필수 항목을 입력하지 않았을 때 밑에 alert이 뜸.
- 주력 업무분야 5개 제한 : 주력 업무 분야에 5개 이상 입력하면 밑에 alert창이 뜸.
- 파일 : 내 컴퓨터 내의 파일을 업로드 할 수 있음.
- 필수항목 미입력 체크 : 필수항목을 1글자 이상입력했거나, 체크 박스 동의를 완료하는 등의 조건에 따라 등록 fetch가 작동.
- 버튼 조건부 렌더링 : 게시물 상세 페이지 내 수정 버튼 누르고 들어오면 수정하기 버튼 노출, 회사소개하기 버튼 누르고 들어오면 등록하기 버튼 노출

---

### **상세페이지 - 회사 상세 정보**

![image](https://user-images.githubusercontent.com/89020079/209655063-228bda2d-7bf6-4e7b-b803-8b84dfe15b76.png)

- 홈페이지 클릭 시 새 탭으로 이동
- 연락처 중 이메일 클릭 시 ‘복사되었습니다’문구와 함께 이메일 복사

![image](https://user-images.githubusercontent.com/89020079/209655179-1fd5a6a4-74d5-416d-8472-76f5edb9c122.png)

- 회사 소개서 클릭 시 파일 다운로드

### **상세페이지 - 댓글**

- 댓글,대댓글 달기
![sendReply](https://user-images.githubusercontent.com/89020079/209655227-4f0e0f52-72f5-4a42-a84c-ec8f6dcf9cb8.gif)
![sendNestedReply](https://user-images.githubusercontent.com/89020079/209655257-3e24c622-f2f9-4a4c-af99-22cb9b8b1536.gif)

- 댓글수정, 삭제 가능
- 페이지네이션 (무한스크롤로 구현하고 싶었으나 기획문서를 따라 페이지네이션 처리)

![image](https://user-images.githubusercontent.com/89020079/209655293-68508fc5-454a-48d5-85a0-31677c834ba1.png)
