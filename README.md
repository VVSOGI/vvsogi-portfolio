# Section Scroll

## 자기소개

배우려는 자세와 의지는 누구보다 뛰어나다고 생각합니다.
저는 이제 개발을 시작한 지 1년이 된 주니어 개발자입니다. 하지만 1년간 이뤘던 성과는 결코 적다고 생각하지 않습니다. 처음에 html을 메모장에 직접 작성해가며 브라우저에 띄워놓았던 시기가 생각이 납니다. 이후에 css라는 것을 알게 되었고, Javascript가 무엇인지 알게 되었고 React, Typescript, React-Native 같은 여러가지 기술들을 다루게 되었습니다. 운이좋게도 이 스택들을 배우는 데 투자한 시간들이 너무나도 즐거웠습니다. 그리고 의지할 수 있는 팀원들을 만나서 더더욱 많은 도전을 할 수 있었습니다. 저는 앞으로도 뛰어난 개발자들의 작업물이나 지식들을 깊이있게 공부할 것이고 개발 뿐만 아니라 여러가지 방면의 훌륭한 사람들과 대화하면서 깨달은 것들을 코드로 작성해서 사람들에게 보여줄 수 있게끔 하고싶습니다. 아직은 여러가지로 부족한 개발자이고 미숙한 사회초년생이지만 제가 가진 개발이란 무기를 더 갈고 닦아서 향후 5년안에 깜짝 놀랄만한 작업물을 만들 수 있는 사람이 될 것 입니다. 데일 카네기의 명언 중에 "과정에서 재미를 느끼지 못하는데 성공하는 일은 거의 없다"라는 말이 있습니다.

지금 즐겁게 개발을 할 수 있음에 감사하며, 앞으로도 다양한 기술들을 익혀서 남들이 생각 하지 못했던 것들을 마법처럼 완성시킬 수 있는 개발자가 되도록 노력하겠습니다.

## 작중일기

포트폴리오를 만드는 작업 중에 섹션 단위로 움직이는 스크롤을 구현하기 위해서 세 가지의 시도를 해볼 것이다.

### 1. GSAP Scroll Trigger

잘 알려진 라이브러리인 GSAP을 이용해서 스크롤하는 방법이 있다. 최초로 시도한 방법인데, 이전 프로젝트인 밥파고에서도 사용해본 경험이 있기에 작업 과정은 그렇게 어렵지 않았다. 중요한 것은 밥파고 프로젝트에서는 정확히 전체 페이지에서 섹션을 이용해 작은 컴포넌트들이 그 위치에서 스크롤 되는 효과였는데 이번 포트폴리오는 전체를 담고있는 스크롤을 이용해서 보여주는 영역을 다르게 해야하는 점이다. 이전 프로젝트는 움직여야하는 섹션들이 한 위치에 fixed 되어 있기에, 스크롤을 이용할 때, 화면의 Shiver를 감지할 수 없었지만, 이번 포트폴리오 에서는 스크롤을 할 때, 화면이 격하게 shivering 되는 것을 확인할 수 있었다. 보는 입장에서 스크롤을 움직일 때 마다 화면의 모든 것들이 지진난 것 처럼 움직여버리면, 유저 경험 만족도가 상당히 낮아진다는 판단을 내려 어쩔 수 없이 GSAP 라이브러리를 사용하는 것은 포기했다.

```js
/*  GSAP  */

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
let scrollTween: null | gsap.core.Animation;

function goToSection(i: number) {
  let number = i + 1;
  setMapIndex(number);

  scrollTween = gsap.to(window, {
    scrollTo: { y: i * window.innerHeight, autoKill: false },
    duration: 2,
    onComplete: () => (scrollTween = null),
    overwrite: true,
    ease: Power4.easeInOut,
  });
}

nodeList.forEach((section: any, i: number) => {
  ScrollTrigger.create({
    trigger: section,
    onEnter: () => goToSection(i + 1),
    start: "0%",
  });
  ScrollTrigger.create({
    trigger: section,
    end: "99.5%",
    onEnterBack: () => goToSection(i),
  });
});

/*  GSAP  */
```

### 2. 직접 섹션단위 스크롤 효과를 구현하기.

두 번째 방법은 직접 섹션 스크롤을 구현하는 것이었다. 위의 GSAP 코드와 다른 점이 있다면 ScrollTrigger가 되는 section에 addEventListener를 붙이는 것이다. 여기서 중요한 것은 GSAP에서는 알아서 최적화가 되기 때문에 필요하지 않았지만, 직접 작성하면 wheel의 전체 움직임을 감지하는 것이 아닌, 마지막 움직임만 감지할 필요가 있기에, Debounce를 걸어줘야 한다. 추가적으로 GSAP에서 했던 방식에서 약간 다른 점은 scrollTo로 움직이는 것이 아닌 직접 CSS의 top의 위치를 이용해서 움직이는 것이다.

이 방식을 이용하기 위해서 큰 토탈 섹션을 만든 후에 움직임이 필요한 섹션들을 담아줬다. 이제 유저가 마우스 휠을 아래로 움직이면 토탈 섹션을 아래로 움직이는 이벤트 함수가 발생해서 스크롤을 하고 있는 느낌을 그대로 살리되, CSS가 줄 수 있는 여러가지 Animation 효과를 이용할 수 있다는 장점을 가져갈 수 있다.

GSAP을 이용했을 때의 Shivering은 전혀 감지할 수 없었고 움직임은 훨씬 부드러워 졌다. 하지만 큰 문제가 있다. 예를 들어 [section1, section2, section3, section4]의 화면을 가지고 있다고 보고, 스크롤을 이용하여 section1부터 section3까지 이동한 후에 새로고침을 눌렀다고 가정하겠다. 당연하게 모든 컴포넌트들이 초기화 되면서 화면이 section1으로 이동할 줄 알았는데, 새로고침을 눌른 후에도 section3에 머물러 있었다. 문제는 화면의 위치보다 section의 index가 문제였다. 리 렌더링 되면서 3이었던게 1로 가버리니 다음 스크롤에서의 움직임을 예측할 수 없게 됬다.

문제를 해결하기 위해 새로고침을 눌렀을 때, 직전에 모든 것을 초기화 하는 방법이나 local Storage에 위치를 저장해놔서 다음에 켰을 때, Css에서 top의 위치를 직접 수정하는 방식을 이용하는 방법을 도입해봤지만, 실패했다.

한마디로 새로고침 했을 때 최초로 돌아가는 것이 아닌, 이전 화면의 CSS를 그대로 기억해서 토탈 섹션의 움직임이 불확실해졌다.

```js
/* Debounce */

let scrollStatus = {
  wheeling: false,
  functionCall: false,
};
let scrollTimer: any = false;

sections.forEach((section, index) => {
  section.addEventListener("wheel", (e: any) => {
    e.preventDefault();
    let deltaY = e.deltaY;
    scrollStatus.wheeling = true;
    if (!scrollStatus.functionCall) {
      if (deltaY > 0) {
        goToSection(index + 1);
      }
      if (deltaY < 0) {
        goToSection(index - 1);
      }
      scrollStatus.functionCall = true;
    }
    window.clearInterval(scrollTimer); // <- Debounce
    scrollTimer = window.setTimeout(() => {
      scrollStatus.wheeling = false;
      scrollStatus.functionCall = false;
    }, 50);
  });
});

/* Debounce */
```

### 3. fullpage.js 라이브러리 사용.

이 부분은 아직 사용하지 않았고, 최선을 다해서 이 방법을 피하기 위해 노력해봤지만, 아쉽게도 결국 사용을 해볼 때가 온 것 같다. 이 라이브러리가 알기로는 유료인 걸로 알고 있는데, 엄청 큰 프로젝트가 아니기에, 한 번 사용해보는 것 자체는 괜찮을 것 같다.

2021 12 06 추가-

전에 시도했던 두 가지 방법을 시도한 뒤 문제점들을 보완하기 위해서 Fullpage js 라이브러리를 사용했다. 리액트 버전에는 따로 타입스크립트를 add 할 수 없는 것 같아서, 어쩔 수 없이 2.96버전에 J query를 사용했다. 제이 쿼리는 개발을 하면서 최대한 지양하자는 마인드로 해왔지만 상황이 어쩔 수 없었다. 우선 필요한 것들을 패키지 제이슨에 넣어주고 실행을 해봤을 때, 에러가 발생했다. 에러의 내용을 분석한 결과, 웹팩에 필요한 부분들을 추가해줬다. 이 부분은 먼저 나와 비슷한 케이스를 다룬 블로거를 참조했다.

결론적으로 원하는 결과물을 낼 수 있었다. 최초에 GSAP을 이용했을 때의 shivering은 발생하지 않았고, 두 번째 방법에서 발생했던 이전 CSS가 리 렌더링 됬을 때 초기화가 되면서 초깃값으로 잘 돌아갔다. 이제는 언제 어디서 새로고침을 눌러도 쉽게 내가 원하는 화면으로 유저들을 인도할 수 있게 됐다.

그리고 Fullpage js는 상업적인 용도로 사용하려면 값을 지불하고 사용해야하지만 나 같이 포트폴리오나 다른 목적으로 사용할 경우에는 깃헙에 퍼블릭으로 설정만 잘 해놔서 올려놓으면 된다고 한다. 사실 영어를 직역한거라 틀릴 가능성도 있지만, 확실한건 비상업적이면 무료다.

이번 기회에 이 라이브러리에 어떠한 옵션들을 사용할 수 있는지 세세하게 파해쳤다. 우선 기존의 방식에서는 움직일 때마다 움직인 섹션의 인덱스를 얻어왔었는데 분명히 이렇게 큰 라이브러리라면 움직이는 위치에 대한 정보를 얻을 수 있는 옵션이 있을거라 생각했고, 잘 찾아본 결과 라이브러리에서 제공하는 onLeave 메소드를 사용하면 원하는 결과를 얻을 수 있다는 정보를 찾았다. 이렇게 되면 기존에 사용했던 디바운스나 가독성 떨어지는 여러가지 코드들을 없앨 수 있게되서 한결 보기 편해졌다.

최대한 라이브러리의 사용을 지양하는 것을 목표로 개발하고 있지만, 여러 사람들이 같이 만든 라이브러리는 쉽고 편리한 것 같긴 하다. 라이브러리 사용을 남용하진 않되, 필요한 부분이 있다면 수용하는 것도 괜찮은 방법인 것 같다.

```js
/* Fullpage.js */

$((): void => {
  $("#fullpage").fullpage({
    autoScrolling: true,
    navigation: true, // map 기능도 제공해줌.
    scrollingSpeed: 1200, // 스크롤 스피드
    navigationPosition: "left", // map 위치 스트링 타입으로 넣어줘야 한다.
    css3: true,
    easingcss3: "cubic-bezier(.74,.22,.26,1.01)", // 원하는 애니메이션을 사용할 수도 있다.
    onLeave: (origin: object, destination: number, direction: string) => {
      setMapIndex(destination);
    }, // 이동하는 위치를 제공하는 함수.
  });
});

/* Fullpage.js */
```

# Plan

포트폴리오 사이트는 생각보다 진행이 잘 되어가고 있다. 남은 것은 라우터를 이용한 페이지 전환과 바텀에 들어갈 이미지 정하기, 네비게이션 이모티콘으로 정리, 모바일 반응형 웹 구현정도가 있을 것 같다. 난이도로 먼저 정리를 해보면

⭐️⭐️⭐️
라우터를 이용한 페이지 전환

- 안에 내용물 채워 넣기.

⭐️⭐️
모바일 반응형 웹 구현

⭐️
네비게이션 이모티콘 정리

기업과제로 리액트 네이티브를 사용할 일이 있어서 당장에 포트폴리오 사이트를 구현하기에 시간 투자를 많이 할 수 없을 것 같다. 리액트 네이티브는 사용해본 적이 없어서 당장 배워야하고 일주일만에 구현할 수 있는 것인지 판단을 내릴 수 없다. 기업과제를 우선적으로 제출하는 것을 목표로 해야겠다. 이에따라 시간 계획을 분배해보면 하루 6시간 리액트 네이티브로 기업과제 집중, 1시간 알고리즘 풀이, 1시간 포트폴리오 사이트 제작 정도로 나뉠 수 있겠다.

12/12 (일)

- 6시간 리액트 네이티브 기업 과제
- 1시간 알고리즘
- 1시간 포트폴리오 사이트 제작

.
.
.

기업 과제 완료까지

2022 01 04 화

### 배포

드디어 첫 번째 배포가 완료되었다. 위에 스스로 줬던 과제는 알고리즘 공부 빼면 성공했다. 잠깐 기업 과제에 대해서 복기를 해보면, 리액트 네이티브와 평소에 사용했던 리액트는 아주 비슷하면서 살짝 달랐다. 그렇게 어렵지는 않았지만, 기업 과제에 통과하지는 못했다. 사실 조건에 만족하지 못하는 것이 하나 있었고, 미숙한 점들이 꽤 많이 보였었기에 그런 것 같다. 하지만 러닝커브 4일과 실제 작업 3일로 만든 결과물 치고는 나쁘지 않았다. 앱을 만드는 과정이 어떤 방식으로 이뤄져야 하는 지도 공부가 됐고, 개인적으로 발전할 수 있는 시간이었던 것 같다.

어쨋든 포트폴리오 사이트에 대해서 첫 번째 리뷰를 해보자면, 일단 만족스러운 결과물이 나온 것 같다. 물론 아직 반응형 웹을 구현하지 않아서 큰 화면에 밖에 적용이 안되는 반 쪽짜리 사이트긴 하지만 최초에 원했던 기능들이 잘 구현이 됬고, 중간 중간 튀어나오는 버그들도 2~3시간 안에 잡았다. 일단 첫 번째로 배포를 시도하기 위해서 깃헙의 호스팅 페이지를 이용하려 했다. 맥락을 읽었다면 아마 배포가 실패했다는 것을 알았을 것이다. 배포하는 과정에서 도메인에 이름이 잘 적용이 안되는 것 같았고, 크게 두 가지 문제가 보였는데 첫 번째로 구글에서 타겟 광고를 이용하기 위해서 제공하는 FLoC 기능에서 발생했던 것 같다. 이것을 깃헙측에서 아예 차단하는 것 같은데, 대체 해결할 수 있는 방법을 찾을 수 없었다. FLoC 기능을 차단하고 배포를 시도해봐도 전혀 먹히지 않았다. 이 부분에서 1시간 정도 삽질을 했다.

두 번째로, jQuery에서 문제가 생겼다. 풀 페이지 JS를 사용하기 위해서 오버라이딩을 했고, react-app-rewired를 이용해서 package.json의 스크립트를 동작했는데, 실제 빌드할 때는 그냥 react build를 했더니 문제가 생겼던 것 같다. 사실 이 문제가 아닐 수도 있지만, jQuery는 배포 전부터 이 부분에서 뭔가 문제가 생길 것 같은 느낌을 강하게 받았기 때문에 정확한 원인은 모르지만 추측으로는 그렇다. 사실 다 필요없고 이 부분만 문제가 없기를 기도했지만 결국 피해갈 수 없던 것 같다. 라이브러리를 사용하는 개발자에게 주어진 숙명이다.

이 순간에 결정을 내렸어야 했다. 제이쿼리 문제를 해결한다 해도, 과연 내가 깃헙의 플록 문제를 해결할 수 있을까? 깃헙과 구글의 고래싸움에 등 터지는 새우가 되는 것만은 피해야한다. 그래서 차선책으로 Netlify를 이용해서 배포하기로 결정했다. 예전에도 한 번 해본적이 있었고, 어렵지 않을 것이라는 생각이 들었다. 이제 Netlify를 이용한 결과가 어떻게 되었는 지 적어보겠다.

결과는 성공적이었다. 처음에 에러가 발생했지만, 이 에러는 최초에 내가 깃헙에 배포하기 위해서 package.json에 홈페이지를 작성해놓은 것이 원인 이었기 때문에 그 부분을 지운 다음에 react-app-rewired build를 하고, Netlify deploy를 다시 시도한 후에 제공해준 도메인에 접속을 해보니 내 포트폴리오가 아주 깔끔하게 잘 나오는 것을 확인했다. 그저 무한하게 감사할 수 밖에 없었다. 걱정했던 제이쿼리 문제도 스무스하게 넘어갔고, 누락되는 부분도 없이 잘 나왔다. 감사합니다 Netlify 선생님..!

이제 앞으로의 계획은 대부분이 반응형 웹을 구현하는 것에 있을 것 같다. 코드도 대부분 정리해놨으니 약 하루 이틀정도만 투자하면 될 것 같다. 그리고 반응형을 다 구현한 다음에 마지막 배포를 하면 완벽하게 나를 위한 포트폴리오 사이트가 만들어지는 것이다. 그럼 다 완성한 다음에 다시 글을 끄적이러 오겠다.

// 그런데 깃헙 호스팅은 어떻게 끄지?

### 피드백

오늘 완성된 작업물을 엣지 팀에게 보여줬다. 엣지 팀은 나와 같이 밥파고 프로젝트를 진행했던 팀원들이다. 우선 작업물을 마음에 들어해주셔서 감사했다. 큰 관심과 많은 피드백들이 들어왔다! 가장 중요한 것은, 배포를 했던 Netlify에서 내게 준 도메인은
https://vvsogi-portfolio.netlify.app/ 인데, 여기서 내가 만든 페이지로 이동하면 https://vvsogi-portfolio.netlify.app/about 이런 식으로 뒤에 원하는 페이지 이름으로 변경이 된다. 근데 여기서 새로고침을 하면 페이지 낫 파운드 404가 발생한다. 추측을 해보면 주어진 도메인이 아닌 부분이 있기에 Netlify에서 찾지 못하는 것 같다. 아무래도 About 페이지나 Project 페이지에서 새로고침을 하면 새로고침을 감지해서 자동으로 메인 페이지로 다시 넘어가는 형식을 취해야 할 것 같다. 그렇지 않으면 다른 방식으로 배포를 해야하는데 이 방법은 피하고 싶다.

- 1. 새로고침 감지.

두 번째는 About 페이지나 Project 페이지에서 아래에 스크롤 내릴 공간이 있다는 것을 처음에 다들 알지 못했다고 한다. 스크롤을 내가 의도적으로 표시하지 않았는데, 그럴 경우에 밑에 공간이 더 있다고 표시를 해줘야 한다는 것을 깨달았다. 그러므로 두 페이지에서 스크롤 다운을 표시할만한 것을 제작해야한다.

- 2. 스크롤 다운 표시

Navbar가 잘 보이지 않는 것 같다. 아무래도 색깔을 다른 색으로 표시해줘서 넵바의 존재감을 어필해야겠다.

- 3. 넵바 존재감 어필

백그라운드에 깔려있는 달은 마우스의 현재 위치에 따라 반대로 움직이게끔 함수를 짜놨는데, 생각보다 뒤에 달이 움직인다는 것을 몰라준다.. 달의 움직임을 좀 더 많이 주고, 마우스 움직임의 범위를 넓혀서 달도 그만큼 많이 움직일 수 있게끔 해야겠다.

- 4. 달 움직임 높이기.

PASSION 컴포넌트에는 말 그대로 PASSION이 많이 담겨있는데, 이 부분이 뭔가 싼마이가 많이 난다. 성훈님께서 폰트를 바꿔보는 것을 추천해주셨고 바로 적용을 해봐야겠다. 그런데 내 눈에 갑자기 오른쪽에 있는 글도 지저분해보인다. 그냥 간단한 글로 열정이 있다는 것을 표현하고, 왼쪽의 PASSION들도 세로 말고 다시 가로로 바꿔야겠다. 배치는 기본적으로 디자인의 감각이 필요한데, 아직 내 소양이 부족한 것 같다. 더 많은 작품과 아티클의 배치를 확인하며 감각을 길러봐야겠다.

- 5. PASSION 폰트, 대거 수정

내가 할 수 있는 스킬들을 나열한 부분인 Skill 컴포넌트에서는 페이지 전환과 커서의 모양 변화 등등 다양한 이벤트가 있는데, 문제는 해당 스킬의 텍스트에 커서가 올라가야 이벤트가 발생한다는 것이다. 이 부분에서 팀원들은 이벤트가 있나 해서 눌러봤는데 아무런 변화가 없어서 그냥 지나갔다고 한다. 고심해서 만든 부분인 만큼 다시 손봐야한다. 우선 텍스트에 커서가 올라가면 변화하는 것이 아닌, 해당 스킬 박스 전체에 커서가 올라가면 바로 바뀔 수 있도록 수정을 해보자.

- 6. Skill 수정

전체적으로 About 페이지에서 부족함을 많이 느낀다. 마지막 바텀 부에서도 솔직히 뭔가 낮은 퀄리티가 강하게 느껴진다. 차라리 메인 페이지의 달을 이용해서 원래 사용했던 배경을 이용해보는게 나을 것 같다.

- 7. About 바텀 부 수정

- ### 피드백 완성본 배포

- 1. 새로고침 수정
     우선 pathname이 / 에서 /홍길동 처럼 바뀐 상태에서 새로고침을 하면 page not found 404가 나왔던 버그는 netlify에서도 유명한 버그?라고 보면 될 것 같다. 해결 방법은 root 경로에 netlify.toml 파일을 만든 후 리다이렉트를 설정하면 된다. 나 같은 경우에는

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200

이런 식으로 index.html과 관련된 모든 것들에 상태를 200으로 설정해두었다. 결과는 이제 어바웃 페이지나 프로젝트 페이지에서 새로고침을 한다고 하더라도 page not found는 발생하지 않는다.

- 2. 스크롤 다운 수정

어바웃 페이지와 프로젝트 페이지에서 첫 번째 문제는 아랫 쪽에 구현해둔 것들이 많은데 스크롤이 가능한 지 모른다는 문제였다. 그래서 좌측 하단에 스크롤 다운이라는 텍스트를 넣어놓고 keyframe으로 애니메이션 효과를 구현하여 위 아래로 움직이는 텍스트를 만들었다. 다행인 점은 어바웃 페이지와 프로젝트 페이지는 첫 번째 시작의 구성이 동일하기 때문에, 늘 좌측 하단이 동일하게 비어있다는 점이다. 스타일적으로 많이 사용되는 컴포넌트들은 src에 컴포넌트라는 폴더 안에 넣어놓았는데, 이 경우에도 두 번이 사용되니 컴포넌트의 스타일 온리라는 폴더안에 스크롤다운이라는 폴더와 파일을 만들어서 한 번 만든 후에 두 번 사용했다.

- 3. 넵바 수정

기존의 넵바의 컴포넌트들은 흰색이 기본이었는데, 아무래도 눈에 잘 안띄는 것 같아서, 연한 붉은 색감을 이용해서 바꿨다. 전체적인 프로젝트와 잘 어울리는 색깔인 것 같아서 만족스럽다.

- 4. 달 움직임 수정

달이 움직이는 지 몰랐다는 피드백을 받았다. 달은 화면 중앙을 기준으로 상하좌우로 약 300px 정도의 범위 내에서 마우스의 움직임에 영향을 받았는데, 이 300px이 너무 좁다는 생각이 들었다. 그 폭을 대거 넓혔더니, 일단 내 맥북에서는 거의 화면 전체적으로 움직였을 때 같이 움직인다. 전 보다는 확실하게 움직임을 많이 느낄 수 있다.

- 5. PASSION 폰트 및 대거 수정

일단 두꺼운 폰트를 사용해서 PASSION이라는 단어를 더 단단한 느낌이 들게끔 수정했다. 그리고 문제는 오른쪽의 중구 난방의 텍스트에서 온다고 생각해서, 아예 다 삭제하고 임팩트 있는 문구를 넣어놨다. 전보다 훨씬 깔끔해진 느낌이 든다.

- 6. Skill 컴포넌트 수정

skill은 추후에 다양한 효과와 canvas적 이벤트를 많이 사용할 것이기에, 유일하게 미완성으로 남겨놓은 부분인데, 그래도 페이지가 전환되는 이벤트까지는 구현을 해놨기 때문에 포트폴리오 사이트를 이용하는 유저가 스킬의 한 부분을 클릭하면 페이지가 전환이 된다는 것을 알려줘야 한다. 이 전에는 텍스트에 커서가 올라가야 변화가 있었는데, 이제는 스킬을 담고있는 박스에 커서가 올라가기만 해도 변화를 하게 된다. 이 전보다 확실하게 존재감을 어필하는 것 같아서 좋다.

- 7. About 바텀 부 수정

어바웃 페이지의 바텀 부분은 낮은 퀄리티를 가지고 있었다. 억지로 배경색깔을 수정한 부분이 문제였다고 판단하고, 추가된 부분들을 대부분 제거했다. 뭔가를 추가하기보다 뺄 때 더 나은 결과물도 있다는 것을 느꼈다. 아무튼 만족!
