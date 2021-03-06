//https://teachablemachine.withgoogle.com/models/mlHXL5MdY/

Webcam.set({
    image_format: "png",
    png_quality: 90,
    width: 350,
    height: 350
});
camera = document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+ data_url +'"/>';
    });
}
console.log('ml5.version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mlHXL5MdY/ model.json', modelLoaded);
function modelLoaded(){
    console.log('modelLoaded');
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "first prediction is" + prediction_1;
    speak_data_2 = "second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img, got_result);
    
}
function got_result(error,result){
    if(error){
        console.error;
    }else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if(result[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        if(result[0].label == "sick face"){
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }
        if(result[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548";
        }

        if(result[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522";
        }
        if(result[1].label == "sick face"){
            document.getElementById("update_emoji2").innerHTML = "&#128532";
        }
        if(result[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548";
        }
    }
}


