/*
 MANAGEMENT MISSION — QUESTION BANK
 Edit the questions below to customize the game.
 Each item requires: room, roomName, icon, scenario, question, options, answer (zero-based option index), explanation.
 Keep at least one question for each room. The final question should use a new example to check transfer.
*/
const QUESTION_BANK = [
  {room:0,roomName:"Planning Lab",icon:"📋",scenario:"A small café wants to increase weekday sales. The manager reviews last month's sales and sets a measurable goal for the next month.",question:"Which management function is the manager mainly using?",options:["Planning","Organizing","Leading","Controlling"],answer:0,explanation:"Planning means setting objectives and deciding in advance what actions will help achieve them. Reviewing information and setting a measurable sales goal are planning activities."},
  {room:0,roomName:"Planning Lab",icon:"🎯",scenario:"A project team has three weeks to launch a new service. They list the tasks, deadlines, and expected results before work begins.",question:"Why is this step an example of planning?",options:["It motivates employees through praise","It decides goals and actions before implementation","It compares actual results with standards","It assigns authority to departments"],answer:1,explanation:"Planning looks ahead. It clarifies what should be achieved, what work is needed, and when activities should happen."},
  {room:0,roomName:"Planning Lab",icon:"🗺️",scenario:"A manager compares three possible ways to reduce customer waiting time and estimates the cost and benefit of each.",question:"What should the manager do next as part of sound planning?",options:["Choose an option without checking evidence","Wait until customers complain again","Evaluate the alternatives against the objective and constraints","Give every employee the same task"],answer:2,explanation:"Good planning compares alternatives against objectives, evidence, resources, and constraints before selecting a course of action."},
  {room:1,roomName:"Organizing Hub",icon:"👥",scenario:"A college event needs registration, publicity, venue preparation, and technical support. The coordinator assigns each task to a team and clarifies who reports to whom.",question:"Which management function is most directly demonstrated?",options:["Planning","Leading","Controlling","Organizing"],answer:3,explanation:"Organizing arranges work, people, responsibilities, and reporting relationships so that a plan can be carried out."},
  {room:1,roomName:"Organizing Hub",icon:"🧰",scenario:"A department has a limited budget, five staff members, and two vehicles. The supervisor allocates these resources to the activities that need them.",question:"What is the main purpose of this action?",options:["To arrange resources to support the work","To measure final performance only","To establish the organisation's long-term vision","To discipline employees"],answer:0,explanation:"Organizing includes allocating resources and matching people and materials with the tasks that need to be completed."},
  {room:1,roomName:"Organizing Hub",icon:"🧩",scenario:"Two employees believe they are both responsible for approving the same purchase, while another task has no owner.",question:"Which organizing improvement would best address the problem?",options:["Increase the sales target","Clarify roles, responsibilities, and authority","Ignore the overlap until the deadline","Measure customer satisfaction"],answer:1,explanation:"Clear role definitions and authority reduce duplication and prevent important tasks from being overlooked."},
  {room:2,roomName:"Leadership Lounge",icon:"🗣️",scenario:"A team is discouraged after a difficult customer complaint. The manager listens to their concerns, explains the purpose of the work, and encourages them to improve together.",question:"Which management function is most visible?",options:["Controlling","Organizing","Leading","Planning"],answer:2,explanation:"Leading involves communicating, motivating, guiding, and influencing people toward shared goals."},
  {room:2,roomName:"Leadership Lounge",icon:"🤝",scenario:"A new employee is unsure how to complete a task. The supervisor demonstrates the process, invites questions, and gives constructive advice.",question:"Why is this an example of leading?",options:["It sets a budget for next year","It checks output against a target","It changes the reporting structure","It guides and supports an employee"],answer:3,explanation:"Leading is not only giving orders. It also includes coaching, communication, support, and helping employees perform well."},
  {room:2,roomName:"Leadership Lounge",icon:"🌟",scenario:"A manager notices that team members value different things. Some want development opportunities, while others value recognition for good work.",question:"Which response best reflects effective leadership?",options:["Listen to employees and use suitable ways to motivate them","Assume everyone is motivated by the same reward","Stop communicating to avoid disagreement","Focus only on checking attendance"],answer:0,explanation:"Effective leaders learn what motivates their team and communicate in ways that support performance and engagement."},
  {room:3,roomName:"Control Centre",icon:"📊",scenario:"A warehouse sets a target of shipping 100 orders each day. At the end of the week, the manager compares actual shipments with the target and investigates a shortfall.",question:"Which management function is being used?",options:["Leading","Controlling","Organizing","Planning"],answer:1,explanation:"Controlling measures actual performance, compares it with standards, identifies gaps, and helps determine corrective action."},
  {room:3,roomName:"Control Centre",icon:"🔍",scenario:"Customer complaints have risen above the service standard. The manager studies the complaint data, finds a recurring delivery issue, and changes the checking process.",question:"What makes this a controlling activity?",options:["The manager creates a new department","The manager motivates staff with a speech","Performance is measured and corrective action is taken","The manager sets an initial company vision"],answer:2,explanation:"Controlling is a cycle: establish standards, measure performance, compare results, and correct problems where needed."},
  {room:3,roomName:"Control Centre",icon:"🚀",scenario:"FINAL TRANSFER TEST: A student club plans a charity fair. On the day, the treasurer discovers spending is above the approved budget and checks receipts before recommending changes to remaining purchases.",question:"Which function is the treasurer applying in this new situation?",options:["Leading, because the treasurer is inspiring volunteers","Organizing, because the treasurer assigned the stalls","Planning, because the treasurer first set the event goal","Controlling, because actual spending is checked against a budget standard"],answer:3,explanation:"This new example tests transfer of learning. The treasurer compares actual spending with the budget and considers corrective action, which is controlling."}
];

const ROOMS = [
  {name:"Planning Lab",subtitle:"Set the direction"},
  {name:"Organizing Hub",subtitle:"Arrange resources"},
  {name:"Leadership Lounge",subtitle:"Guide the team"},
  {name:"Control Centre",subtitle:"Check performance"}
];

const screens = ["homeScreen","instructionsScreen","gameScreen","completeScreen"];
let questionOrder = [];
let currentIndex = 0;
let score = 0;
let firstAttemptCorrect = new Set();
let answeredCurrent = false;
let currentQuestionHadWrongAttempt = false;
let untimed = true;
let completedQuestions = new Set();

const $ = id => document.getElementById(id);
function showScreen(id){
  screens.forEach(screenId => $(screenId).classList.toggle("hidden", screenId !== id));
  window.scrollTo({top:0,behavior:"smooth"});
}
function shuffleQuestions(){
  // Keep the final transfer test last; shuffle the first 11 challenges for replay variety.
  const main = QUESTION_BANK.slice(0,-1);
  for(let i=main.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[main[i],main[j]]=[main[j],main[i]];}
  return [...main, QUESTION_BANK[QUESTION_BANK.length-1]];
}
function startMission(){untimed=$("untimedToggle").checked;showScreen("instructionsScreen");}
function enterMission(){
  questionOrder=shuffleQuestions();currentIndex=0;score=0;firstAttemptCorrect=new Set();completedQuestions=new Set();
  renderQuestion();showScreen("gameScreen");
}
function renderQuestion(){
  const q=questionOrder[currentIndex];answeredCurrent=false;currentQuestionHadWrongAttempt=false;
  $("roomEyebrow").textContent=`ROOM ${String(q.room+1).padStart(2,"0")} · ${ROOMS[q.room].subtitle.toUpperCase()}`;
  $("roomTitle").textContent=q.roomName;
  $("questionCount").textContent=`${currentIndex+1} / ${questionOrder.length}`;
  $("scoreDisplay").textContent=score;
  $("progressText").textContent=`${Math.round((completedQuestions.size/questionOrder.length)*100)}% complete`;
  $("progressBar").style.width=`${(completedQuestions.size/questionOrder.length)*100}%`;
  $("scenarioIcon").textContent=q.icon;
  $("scenarioText").textContent=q.scenario;
  $("questionText").textContent=q.question;
  $("answerOptions").innerHTML="";
  $("feedbackPanel").classList.add("hidden");$("feedbackPanel").classList.remove("wrong");
  $("retryButton").classList.add("hidden");$("continueButton").classList.remove("hidden");
  q.options.forEach((option,index)=>{
    const button=document.createElement("button");button.type="button";button.className="answer-option";
    const letter=document.createElement("span");letter.className="option-letter";letter.textContent=String.fromCharCode(65+index);
    const label=document.createElement("span");label.textContent=option;
    button.append(letter,label);button.addEventListener("click",()=>chooseAnswer(index,button));$("answerOptions").append(button);
  });
  updateRoomMap();
}
function chooseAnswer(selected,button){
  if(answeredCurrent)return;
  const q=questionOrder[currentIndex];
  if(selected===q.answer){
    answeredCurrent=true;completedQuestions.add(currentIndex);
    if(!currentQuestionHadWrongAttempt){score++;firstAttemptCorrect.add(currentIndex);}
    [...$("answerOptions").children].forEach((el,i)=>{el.disabled=true;if(i===q.answer)el.classList.add("correct");});
    $("feedbackPanel").classList.remove("hidden","wrong");$("feedbackIcon").textContent="✓";$("feedbackTitle").textContent=currentQuestionHadWrongAttempt?"Correct — challenge unlocked!":"Correct — challenge unlocked!";
    $("feedbackText").textContent=q.explanation;
    $("continueButton").textContent=currentIndex===questionOrder.length-1?"View mission report →":"Continue →";
    $("scoreDisplay").textContent=score;updateRoomMap();
  }else{
    currentQuestionHadWrongAttempt=true;
    button.classList.add("incorrect");
    button.disabled=true;
    $("feedbackPanel").classList.remove("hidden");$("feedbackPanel").classList.add("wrong");
    $("feedbackIcon").textContent="!";$("feedbackTitle").textContent="Not quite — try another answer";
    $("feedbackText").textContent="Think about the main action in the scenario. Is the manager setting a direction, arranging work and resources, guiding people, or checking performance? Select another option when ready.";
    $("retryButton").classList.remove("hidden");$("continueButton").classList.add("hidden");
  }
}
function retryQuestion(){
  $("feedbackPanel").classList.add("hidden");
  // A wrong option remains disabled so the learner can try the remaining choices.
}
function continueQuestion(){
  if(!answeredCurrent)return;
  if(currentIndex<questionOrder.length-1){currentIndex++;renderQuestion();}
  else showCompletion();
}
function updateRoomMap(){
  const q=questionOrder[currentIndex];
  const roomDone=new Set();
  questionOrder.forEach((item,index)=>{if(completedQuestions.has(index))roomDone.add(item.room);});
  ROOMS.forEach((room,index)=>{
    const el=$(`mapRoom${index}`);el.classList.toggle("active",index===q.room);el.classList.toggle("done",roomDone.has(index));
  });
  $("keysDisplay").textContent=`${roomDone.size} / 4 keys`;
}
function showCompletion(){
  const total=questionOrder.length;const percent=Math.round((score/total)*100);
  $("finalScore").textContent=`${score} / ${total}`;
  $("finalCompleted").textContent=`${completedQuestions.size} / ${total}`;
  const roomsDone=new Set(questionOrder.filter((q,i)=>completedQuestions.has(i)).map(q=>q.room)).size;
  $("finalRooms").textContent=`${roomsDone} / 4`;
  $("completionIcon").textContent=percent>=80?"🏆":percent>=60?"🔓":"🧠";
  $("completionTitle").textContent=percent>=80?"Management HQ unlocked!":percent>=60?"Mission completed!":"Mission complete — keep practising!";
  $("completionMessage").textContent=`You earned ${score} of ${total} knowledge points (${percent}%). There are no speed points: your score is based on first-attempt understanding.`;
  $("masteryText").textContent=percent>=80?"Strong understanding. You can identify the four functions and apply them to workplace situations. Review any missed explanations to strengthen your knowledge.":percent>=60?"Good effort. Revisit the explanations for questions you found difficult, then replay to practise applying the four management functions.":"You have completed the mission, which is a useful first step. Review the key ideas below and replay the challenges to build confidence.";
  $("reviewList").innerHTML="";
  ROOMS.forEach((room,index)=>{
    const relevant=QUESTION_BANK.filter(q=>q.room===index);
    const item=document.createElement("div");item.className="review-item";
    const title=document.createElement("strong");title.textContent=room.name;
    const p=document.createElement("p");p.textContent=relevant.map(q=>q.explanation).join(" ");
    item.append(title,p);$("reviewList").append(item);
  });
  showScreen("completeScreen");
}
function returnHome(){showScreen("homeScreen");}
$("startButton").addEventListener("click",startMission);
$("enterButton").addEventListener("click",enterMission);
$("continueButton").addEventListener("click",continueQuestion);
$("retryButton").addEventListener("click",retryQuestion);
$("playAgainButton").addEventListener("click",enterMission);
$("returnHomeButton").addEventListener("click",returnHome);
$("homeButton").addEventListener("click",returnHome);
$("brandHome").addEventListener("click",event=>{event.preventDefault();returnHome();});
$("restartTop").addEventListener("click",()=>{if(!$("gameScreen").classList.contains("hidden")||!$("completeScreen").classList.contains("hidden"))enterMission();else returnHome();});
$("skipToHome").addEventListener("click",returnHome);
