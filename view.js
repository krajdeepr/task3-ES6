class View {
  constructor(Cnt) {
    this.Controller = Cnt;
    this.gData = [];
    this.channelList = [];
    this.all();
  }
  all = () => {
    this.header();
    this.footer();
    this.body();
  };

  header = () => {
    var html = `<h1 id="news-heading1">NEWSFEED</h1><h6 id="news-heading2"><i>Yet another newsfeed</i></h6><label class="side-label2"><strong>SUBSCRIBE</strong></label><br />
                <input type="text" placeholder="Email Address" size="13" id="side-input">
                <button class="side-button" id="validateEvent" type="button">Subscribe</button>`;
    document.getElementById("news").innerHTML = html;
    document
      .getElementById("validateEvent")
      .addEventListener("click", function() {
        validate();
      });
  };

  footer = () => {
    var html = `<p class="foot-text">&copy;NewsFeed 2019</p>`;
    document.getElementById("foot").innerHTML = html;
  };

  body = () => {
    var completeData = "";
    var ichannel = "";
    this.Controller.getChannels().forEach(ele => {
      ichannel =
        ichannel +
        `<option value='${ele}'>
            ${ele} 
            </option>`;
    });
    completeData = `<div id="total">`;
    this.Controller.getData().forEach((ele, i) => {
      completeData =
        completeData +
        `<div class="div-content">
            <img class="total-picture" src="${ele.urlToImage}">
            <h2 class="total-heading">
            ${ele.title}
            </h2> 
            <p class="total-date">
            ${ele.publishedAt} 
            </p> 
            <p class="total-content">
            ${ele.description} 
            </p>
            <button id="myBtn${i}" class="total-button"
            type="button">Continue Reading</button></div>`;
    });
    completeData += `<div id="myModal" class="modal"><div class="modal-content"><div class="modal-header">
        <span onclick="closePopUp()" class="close">&times;</span><h2 id="iHead"></h2></div>
        <div id="popUp_content" class="modal-body"><p>
        </p></div>
        <div class="modal-footer">
        <h3>Till Date</h3></div></div></div><div class="side">
          <label class="side-label"><strong>SELECT CATEGORY</strong></label><br />
          <select id="side-select">
          ${ichannel}
          </select><br /><br />
          </div>`;
    document.getElementById("main").innerHTML = completeData;
    document.getElementById("side-select").addEventListener("change", () => {
      select();
    });
    this.Controller.getData().forEach((ele, i) => {
      document.getElementById(`myBtn${i}`).addEventListener("click", () => {
        popUpAll(ele);
      });
    });
    var select = () => {
      var x = document.getElementById("side-select").value;
      var html = "";
      let index = 0;
      let elemArray = [];
      this.Controller.getData().forEach((ele, i) => {
        if (x === ele.source.name) {
          elemArray.push(ele);

          html =
            html +
            `<div class="div-content">
               <img class="total-picture" src="${ele.urlToImage}">
                     <h2 class="total-heading">
                     ${ele.title}
                     </h2>
                     <p class="total-date">
                     ${ele.publishedAt}
                     </p>
                     <p class="total-content">
                     ${ele.description}
                     </p>
                     <button id="myBtn${index}" class="total-button"  type="button">Continue Reading</button>
                     <div id="myModal" class="modal"><div class="modal-content"><div class="modal-header">
                     <span onclick="closePopUp()" class="close">&times;</span><h2 id="iHead"></h2></div>
                     <div id="popUp_content" class="modal-body"><p>
                     </p></div>
                     <div class="modal-footer">
                     <h3>Till Date</h3></div></div></div></div>`;
          if (index == 0) {
            html += `<div class="side"><label class="side-label"><strong>SELECT CATEGORY</strong></label><br />
            <select id="side-select">
            ${ichannel}
            </select><br /><br /></div>`;
          }
          document.getElementById("total").innerHTML = html;
          index++;
        }
      });
      document.getElementById("side-select").addEventListener("change", () => {
        select();
      });
      for (let k = 0; k < elemArray.length; k++) {
        document.getElementById(`myBtn${k}`).addEventListener("click", () => {
          popUpAll(elemArray[k]);
        });
      }
    };
  };
}

validate = () => {
  emailData = JSON.parse(window.localStorage.getItem("emails"));
  if (emailData == null) {
    var emailData = [];
  }
  var email = document.getElementById("side-input").value;
  if (
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
  ) {
    emailData.push(email);
    window.localStorage.setItem("emails", JSON.stringify(emailData));
    alert("You have entered an valid email address!");
    return true;
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
};

closePopUp = () => {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
};
window.onclick = event => {
  modal = document.getElementById("myModal");

  if (event.target == modal) {
    modal.style.display = "none";
  }
};

popUpAll = ele => {
  document.getElementById("popUp_content").innerHTML = ele.content;
  document.getElementById("iHead").innerHTML = ele.source.name;
  let modal = document.getElementById("myModal");
  modal.style.display = "block";
};
