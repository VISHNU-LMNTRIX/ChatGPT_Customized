let prompt = document.getElementById("prompt");
let sendButton = document.getElementById("sendButton");
let results = document.getElementById("results");
let textButton = document.getElementById("textButton");
let imageButton = document.getElementById("imageButton");
let selected = "text";

textButton.addEventListener("click",()=>{
    selected = "text";
    imageButton.style.border = "1px solid black";
    textButton.style.border = "2px solid black";
});

imageButton.addEventListener("click",()=>{
    selected = "image";
    textButton.style.border = "1px solid black";
    imageButton.style.border = "2px solid black";
});

sendButton.addEventListener("click",async()=>{
    let question = prompt.value;
    prompt.value = "";
    let responseDiv = document.createElement("div");
    responseDiv.classList.add("response");
    let questionText = `<p>You: ${question}</p>`;
    responseDiv.innerHTML+=questionText;
    responseDiv.innerHTML+="<p>AI : Let me think...</p>";
    results.appendChild(responseDiv);

    if(selected === "text"){//text button is clicked
        try{
            let res = await fetch("http://localhost:5000/text",{
                method: "POST",
                headers: {'content-type':'application/json'},
                body: JSON.stringify({prompt:question})
            });
            let responseData = await res.json();
            responseDiv.innerHTML = `${questionText}<p>AI : ${responseData.data}</p>`
        }
        catch(error){
            responseDiv.innerHTML = `${questionText}<p>AI : I can't answer that question right now.</p>`;
        }
    }
    else{
        try{
            let res = await fetch("http://localhost:5000/image",{
                method: "POST",
                headers: {'content-type':'application/json'},
                body: JSON.stringify({prompt:question})
            });
            let responseData = await res.json();
            responseDiv.innerHTML = `${questionText}<br><br><p>AI : <img src="${responseData.data}" width="250" height="250"></p>`
        }
        catch(error){
            responseDiv.innerHTML = `${questionText}<p>AI : I can't answer that question right now.</p>`;
        }
    }
})