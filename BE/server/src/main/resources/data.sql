INSERT INTO "MEMBER" (email, password, display_name, status, create_at, last_modified_at)
VALUES ('member@example.com', 'password123', 'HGD', 'MEMBER_ACTIVE', NOW(), NOW());
INSERT INTO "MEMBER" (email, password, display_name, status, create_at, last_modified_at)
VALUES ('abc@google.com', 'qwer1234', 'MRLEE', 'MEMBER_ACTIVE', NOW(), NOW());
INSERT INTO "MEMBER" (email, password, display_name, status, create_at, last_modified_at)
VALUES ('never@naver.com', 'asdfqwer1234', 'Apple', 'MEMBER_ACTIVE', NOW(), NOW());
INSERT INTO "MEMBER" (email, password, display_name, status, create_at, last_modified_at)
VALUES ('kakao@daum.com', 'zxcvxzcv1234', 'Kim', 'MEMBER_ACTIVE', NOW(), NOW());
INSERT INTO "MEMBER" (email, password, display_name, status, create_at, last_modified_at)
VALUES ('jhon@gmail.com', '456451234asdf', 'Jone', 'MEMBER_ACTIVE', NOW(), NOW());

INSERT INTO "QUESTION" (title, body, created_at, last_modified_at, member_id)
VALUES ('Sample Question', 'This is a sample question.', NOW(), NOW(), 1);
INSERT INTO "ANSWER" (body, created_at, last_modified_at, member_id, question_id)
VALUES ('This is a sample answer.',NOW(), NOW(), 1, 1);
INSERT INTO "COMMENT" (body, created_at, last_modified_at, answer_id, member_id)
VALUES ('This is a sample commet.',NOW(), NOW(), 1, 1);
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (1, 'this');
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (1, 'is');
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (1, 'sample');
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (1, 'tag');

INSERT INTO "QUESTION" (title, body, created_at, last_modified_at, member_id)
VALUES ('h2 경로를 못바꾸겠어요', '저번에 했을때 jdbc:h2:tcp://localhost/~/test 경로인데
이걸 못바꾸겠어요 새로운 경로로 다시만들고 싶은데 어떻게 바꾸는건지 시작화면에서 바꾸니깐 Database "C:/Users/ckehq/jpashop" not found, either pre-create it or allow remote database creation (not recommended in secure environments) [90149-220] 90149/90149 에러만 떠요...',
        NOW(), NOW(), 2);
INSERT INTO "ANSWER" (body, created_at, last_modified_at, member_id, question_id)
VALUES ('안녕하세요. 차도범님, 공식 서포터즈 OMG입니다.
기본적으로 h2화면에서 입력하는 url과 jdbc:h2:tcp://localhost/~/test
강의에서 인텔리제이의 application.yml에 입력하는url이동일해야 db연결과 애플리케이션 실행이 가능합니다 :)',NOW(), NOW(), 3, 2);
INSERT INTO "ANSWER" (body, created_at, last_modified_at, member_id, question_id)
VALUES ('jpashop 경로에 데이터베이스가 없어서 발생하는 문제구요,
H2 데이터베이스 엔진을 켜 놓은 상태에서 우측하단 숨겨진 아이콘 보기 - H2 데이터베이스 엔진 우클릭 - Create a new database 로 새로운 경로의 데이터베이스를 생성할 수 있어요',NOW(), NOW(), 4, 2);
INSERT INTO "COMMENT" (body, created_at, last_modified_at, answer_id, member_id)
VALUES ('감사합니다!!',NOW(), NOW(), 2, 2);
INSERT INTO "COMMENT" (body, created_at, last_modified_at, answer_id, member_id)
VALUES ('도움이 되었습니다.',NOW(), NOW(), 3, 2);
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (2, '스프링');
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (2, '자바');
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (2, 'h2');


INSERT INTO "QUESTION" (title, body, created_at, last_modified_at, member_id)
VALUES ('엔티티 클래스2 강의 부분입니다.', '실행했을때 H2 DB에CATEGORY,CATEGORY_ITEM,DELIVERY,ITEM,MEMBER,ORDERS,ORDER_ITEM 테이블이 생성되지않아서 문의드립니다.
https://drive.google.com/file/d/1N63HWFHbE41DV2aGqkyVLrSnDDhDPcYg/view?usp=drive_link',
        NOW(), NOW(), 4);
INSERT INTO "ANSWER" (body, created_at, last_modified_at, member_id, question_id)
VALUES ('오류 메시지를 보면 애플리케이션 컨텍스트를 로드하지 못했다는 IllegalStateException이 발생했다고 나와 있습니다. 이 오류는 스프링 애플리케이션 컨텍스트를 성공적으로 로드하지 못해서 발생하는 것으로 보입니다.

해당 오류의 원인은 다양할 수 있습니다. 일반적으로는 아래와 같은 사항을 확인해볼 수 있습니다.

의존성 정상 로딩 확인

프로젝트의 의존성이 정상적으로 로딩되었는지 확인해보세요. Maven이나 Gradle의 의존성을 올바르게 설정했는지 확인해야 합니다.
애플리케이션 컨텍스트 설정 확인

스프링 부트의 설정 클래스인 JpashopApplication이 정상적으로 작성되어 있는지 확인해보세요.
애플리케이션 컨텍스트 설정 클래스가 올바르게 작성되지 않았을 경우에도 이 오류가 발생할 수 있습니다.',NOW(), NOW(), 3, 3);
INSERT INTO "ANSWER" (body, created_at, last_modified_at, member_id, question_id)
VALUES ('구글드라이브 액세스 권한이 없어서 못 봤는데, 아마 application.yml 에 hibernate.ddl-auto : create 설정이 안되어 있을 듯 합니다.',NOW(), NOW(), 5, 3);
INSERT INTO "COMMENT" (body, created_at, last_modified_at, answer_id, member_id)
VALUES ('정말 감사합니다!!',NOW(), NOW(), 5, 4);
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (3, 'db');
INSERT INTO "QUESTION_TAGS" (QUESTION_QUESTION_ID, TAGS)VALUES (3, 'test');
