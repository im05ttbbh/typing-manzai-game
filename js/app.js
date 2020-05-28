"use strict";

{

/*-----------タイピング部分-----------*/

    const words = [
      "grape",
      "instagram",
      "program",
      "apple",
      "middle",
      "engineer",
    ]
    let word = words[Math.floor(Math.random() * words.length)];
    let loc;
    const timeLimit = 30 * 1000;
    let startTime;
    let isPlaying = false;
    const target = document.getElementById("target");
    const timerLabel = document.getElementById("timer");

    function updateTarget() {
      let placeholder = "";
      for (let i = 0; i < loc; i++) {
        placeholder += "_";
      }
      target.textContent = placeholder + word.substring(loc);
    }

    function updateTimer() {
      const timeLeft = startTime + timeLimit - Date.now();
      timerLabel.textContent = (timeLeft / 1000).toFixed(2);
      const scores = [...document.querySelectorAll(".score")];

      const timeoutId = setTimeout(() => {
        updateTimer();
      }, 10);

      if (timeLeft < 0) {
        isPlaying = false;
        clearTimeout(timeoutId);
        timerLabel.textContent = "0.00";
        setTimeout(() => {
          alert("Game Over");
        }, 100);

        target.textContent = "click to replay";
      } else if (scores.length === 5) {
        isPlaying = false;
        clearTimeout(timeoutId);
        timerLabel.textContent = "0.00";
        target.textContent = "Game Clear!";
      }
    }

    window.addEventListener("click", () => {
      if (isPlaying === true) {
        return;
      }
      isPlaying = true;

      loc = 0;
      word = words[Math.floor(Math.random() * words.length)];

      target.textContent = word;
      startTime = Date.now();
      updateTimer();
    });
    
    let btnNumber = 0;

    var counts = function() {
      window.addEventListener("keydown", e => {
        if (e.key === word[loc]) {
          loc++;
          if (loc === word.length) {
            word = words[Math.floor(Math.random() * words.length)];
            loc = 0;
            const buttons = document.getElementsByClassName("btn")
            const targetButton = buttons[btnNumber]
            targetButton.click();
            btnNumber++;
            if (btnNumber === 4) {
              btnNumber = 0;
            }
          }
          updateTarget();
        }
      });
    }
    counts();

/*------------優勝時、初期ボタン設定-----------*/

    function victory() {
      var telop = document.querySelector(".telop")
      telop.classList.add("moved");
      telop.innerHTML = "M1優勝しました！！おめでとうございます！！";
    }

    const main = document.querySelector("main");
    bokebtn.disabled = false;
    okanBtn.disabled = true;
    tsukkomiBtn.disabled = true;
    thinkBtn.disabled = true;

    function judge() {
       var img = document.createElement("img");
       img.setAttribute("src", "/img/100ten.jpg");
       img.setAttribute("id", "imgid");
       img.classList.add("score");
       var list = document.getElementsByTagName("li");
       var guests = document.querySelectorAll("#shinsa");
       const scores = [...document.querySelectorAll(".score")];
          if (scores.length === 0) {
            list[0].insertBefore(img, guests[0]);
          } else if (scores.length === 1) {
            list[1].insertBefore(img, guests[1]);
          } else if (scores.length === 2) {
            list[2].insertBefore(img, guests[2]);
          } else if (scores.length === 3) {
            list[3].insertBefore(img, guests[3]);
          } else if (scores.length === 4) {
            list[4].insertBefore(img, guests[4]);
            victory();            
          }
    };

/*--------------ボケ部分--------------*/

    function bokecreate() {
      var section = document.createElement("section");
      var div = document.createElement("div");
      var p = document.createElement("p");
      div.appendChild(p);
      section.appendChild(div);
      section.setAttribute("id", "sec");
      return {p: p, div: div, section: section}
    }
    var bokeobj = bokecreate();

    $("#bokebtn").on("click", function() {
        bokebtn.disabled = true;
        okanBtn.disabled = true;
        tsukkomiBtn.disabled = false;
        thinkBtn.disabled = true;
        bokeobj.p.innerHTML = bokes1[Math.floor(Math.random() * bokes1.length)];
        bokeobj.div.classList.add("balloon2-left");
          if (!!document.querySelector("section")) {
            const sections = document.querySelectorAll("[id^=sec]");
            for(var i = 0; i < sections.length; i++) {
              sections[i].remove();
            }
            main.appendChild(bokeobj.section);
          } else {
            main.appendChild(bokeobj.section);
          }
     });

    $("#okanBtn").on("click", function() {
        bokebtn.disabled = true;
        okanBtn.disabled = true;
        tsukkomiBtn.disabled = true;
        thinkBtn.disabled = false;
        bokeobj.p.innerHTML = bokes2[Math.floor(Math.random() * bokes2.length)];
        bokeobj.div.classList.add("balloon2-left");
          if (!!document.querySelector("section")) {
            const sections = document.querySelectorAll("[id^=sec]");
            for(var i = 0; i < sections.length; i++) {
              sections[i].remove();
            }
            main.appendChild(bokeobj.section);
          } else {
            main.appendChild(bokeobj.section);
          }
      })

/*-----------ツッコミ部分-----------*/

    function tsukkomicreate() {
        var section = document.createElement("section");
        var div = document.createElement("div");
        var p = document.createElement("p");
        div.appendChild(p);
        section.appendChild(div);
        section.setAttribute("id", "sec");
        return {p: p, div: div, section: section}
      }
    var tsukkomiobj = tsukkomicreate();

    $("#tsukkomiBtn").on("click", function() {
        bokebtn.disabled = true;
        okanBtn.disabled = false;
        tsukkomiBtn.disabled = true;
        thinkBtn.disabled = true;
        tsukkomiobj.p.innerHTML = tsukkomi1[Math.floor(Math.random() * tsukkomi1.length)];
        tsukkomiobj.div.classList.add("balloon2-right");
        main.appendChild(tsukkomiobj.section);
          if (bokeobj.p.innerHTML === bokes1[0] && tsukkomiobj.p.innerHTML === tsukkomi1[0]) {
            judge()
          } else if (bokeobj.p.innerHTML === bokes1[1] && tsukkomiobj.p.innerHTML === tsukkomi1[1]) {
            judge()
          } else {;}
      })

    $("#thinkBtn").on("click", function() {
        bokebtn.disabled = false;
        okanBtn.disabled = true;
        tsukkomiBtn.disabled = true;
        thinkBtn.disabled = true;
        tsukkomiobj.p.innerHTML = tsukkomi2[Math.floor(Math.random() * tsukkomi2.length)];
        tsukkomiobj.div.classList.add("balloon2-right");
        main.appendChild(tsukkomiobj.section);
          if (bokeobj.p.innerHTML === bokes2[0] && tsukkomiobj.p.innerHTML === tsukkomi2[0]) {
            judge()
          } else if (bokeobj.p.innerHTML === bokes2[1] && tsukkomiobj.p.innerHTML === tsukkomi2[1]) {
            judge()
          } else {;}
     })

/*-----------漫才中身-----------*/
     
    let bokes1 = [
      "webサイトに動きをつけることができて、webサイトやアプリ開発には不可欠なやつやって言うねん。",
      "Javaと名前は似てるけど、全く別のプログラミング言語やって言うねん。",
    ];

    let bokes2 = [
      "でもわからへんねんな。俺もJavaScriptやと思ってんけどな、おかんが言うには、『忘年会で話したらめちゃくちゃ盛り上がる言葉や』言うねんな。",
      "いやでもわからへんねん。俺もJavaScriptやと思ってんけどな、おかんが言うには、『お洒落なバーで話したらオススメを出してもらえる言葉や』言うねんな。",
    ];

    let tsukkomi1 = [
      "それはJavaScriptやないかい。webサイトに動きを付ける特徴は完全にJavaScriptやがな。",
      "それはJavaScriptやないかい。Javaと名前は似ていても、オーストラリアとオーストリアくらい違うって習ったで。JavaScriptやそれは。",
    ];

    let tsukkomi2= [
      "ほなJavaScriptと違うかー。忘年会でJavaScriptの話なんてしたら『永遠に年越せない』動きを付けるようなもんやからなあ。もうちょっと詳しく教えて。",
      "ほなJavaScriptと違うかー。お洒落なバーでJavaScriptの話なんてしたら、二度と来店できなくなってまうからなあ。もうちょっと詳しく教えて",
    ];
}
