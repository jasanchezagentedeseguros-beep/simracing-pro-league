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
  if(!raw) return defaultData();
  try { return JSON.parse(raw); } catch(e) { return defaultData(); }
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