const ADMIN_PASSWORD = "74877543";
const PROP_KEY = "SPL_I_DATA";

function defaultData(){
  return {
    rules: { winPoints: 25, fastLapPoints: 2 },
    teams: [
      { id:"adp", name:"ADP Racing" },
      { id:"jas", name:"J. A. S. Simracing" }
    ],
    rounds: []
  };
}

function getStored(){
  const props = PropertiesService.getScriptProperties();
  const raw = props.getProperty(PROP_KEY);
  let data = null;
  if(raw){
    try { data = JSON.parse(raw); } catch(e) { data = null; }
  }
  const def = defaultData();
  if(!data || typeof data !== "object") return def;

  // merge defaults (importante si alguien guardó teams vacíos)
  if(!data.rules || typeof data.rules !== "object") data.rules = def.rules;
  if(data.rules.winPoints === undefined) data.rules.winPoints = def.rules.winPoints;
  if(data.rules.fastLapPoints === undefined) data.rules.fastLapPoints = def.rules.fastLapPoints;

  if(!Array.isArray(data.teams) || data.teams.length === 0) data.teams = def.teams;
  if(!Array.isArray(data.rounds)) data.rounds = [];

  return data;
}

function setStored(obj){
  PropertiesService.getScriptProperties().setProperty(PROP_KEY, JSON.stringify(obj));
}

function doGet(){
  const data = getStored();
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  let payload = {};
  try{
    payload = JSON.parse((e && e.postData && e.postData.contents) ? e.postData.contents : "{}");
  }catch(err){
    payload = {};
  }

  const pass = String(payload.password || "");
  if(pass !== ADMIN_PASSWORD){
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:"unauthorized"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const data = payload.data || null;
  if(!data || typeof data !== "object"){
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:"bad_data"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  setStored(data);
  return ContentService.createTextOutput(JSON.stringify({ok:true}))
    .setMimeType(ContentService.MimeType.JSON);
}