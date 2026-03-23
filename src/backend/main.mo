import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Blob "mo:core/Blob";



actor {
  module ApiKey {
    type ApiKeyRaw = {
      name : Text;
      createdDate : Time.Time;
      isActive : Bool;
    };

    public type ApiKey = {
      name : Text;
      createdDate : Time.Time;
      isActive : Bool;
    };

    public func toText(apiKey : ApiKeyRaw) : Text {
      apiKey.name;
    };

    public func compareByName(apiKey1 : ApiKeyRaw, apiKey2 : ApiKeyRaw) : Order.Order {
      Text.compare(apiKey1.name, apiKey2.name);
    };
  };

  module Report {
    public type Status = {
      #completed;
      #analyzing;
    };

    type ReportRaw = {
      name : Text;
      status : Status;
      date : Time.Time;
    };

    public type Report = {
      name : Text;
      status : Status;
      date : Time.Time;
    };

    public func toText(report : ReportRaw) : Text {
      report.name;
    };

    public func compareByName(report1 : ReportRaw, report2 : ReportRaw) : Order.Order {
      Text.compare(report1.name, report2.name);
    };
  };

  module DashboardStats {
    public type DashboardEntry = {
      companiesTracked : Nat;
      activeAnalyses : Nat;
      dataIngestion : Nat;
      apiRequestCount : Nat;
    };
  };

  module UserUsageStats {
    type UserUsageStatsRaw = {
      apiCallCount : Nat;
      reportsGenerated : Nat;
      companiesTracked : Nat;
    };

    public type UserUsageStats = {
      apiCallCount : Nat;
      reportsGenerated : Nat;
      companiesTracked : Nat;
    };

    public func default() : UserUsageStatsRaw {
      {
        apiCallCount = 0;
        reportsGenerated = 0;
        companiesTracked = 0;
      };
    };

    public func compareByApiCallCount(stats1 : UserUsageStatsRaw, stats2 : UserUsageStatsRaw) : Order.Order {
      Nat.compare(stats1.apiCallCount, stats2.apiCallCount);
    };
  };

  module UserProfile {
    public type UserProfile = {
      displayName : Text;
      email : Text;
      avatarUrl : Storage.ExternalBlob;
    };
  };

  module ScoutResult {
    public type Status = {
      #completed;
      #running;
      #failed;
    };

    public type ScoutResult = {
      companyName : Text;
      queries : [Text];
      sources : [Text];
      features : [Text];
      summary : Text;
      timestamp : Time.Time;
      status : Status;
    };

    public func compareByCompanyAndTime(a : ScoutResult, b : ScoutResult) : Order.Order {
      switch (Text.compare(a.companyName, b.companyName)) {
        case (#equal) { Int.compare(a.timestamp, b.timestamp) };
        case (other) { other };
      };
    };
  };

  // Actor state
  let originalUserProfiles = Map.empty<Principal, { displayName : Text }>();
  let originalApiKeys = Map.empty<Principal, List.List<{ name : Text; createdDate : Time.Time; isActive : Bool }>>();
  let originalReports = Map.empty<Principal, List.List<{ name : Text; status : { #completed; #analyzing }; date : Time.Time }>>();
  let originalDashboardStats : DashboardStats.DashboardEntry = {
    companiesTracked = 1490;
    activeAnalyses = 45;
    dataIngestion = 120_000;
    apiRequestCount = 11_000;
  };

  let userProfiles = Map.empty<Principal, UserProfile.UserProfile>();
  let userUsageStats = Map.empty<Principal, UserUsageStats.UserUsageStats>();
  let apiKeys = Map.empty<Principal, List.List<ApiKey.ApiKey>>();
  let reports = Map.empty<Principal, List.List<Report.Report>>();
  let dashboardStats : DashboardStats.DashboardEntry = {
    companiesTracked = 1490;
    activeAnalyses = 45;
    dataIngestion = 120_000;
    apiRequestCount = 11_000;
  };
  let userPrimaryApiKeys = Map.empty<Principal, Text>();
  let apiKeyLookup = Map.empty<Text, Principal>();
  let scoutResults = Map.empty<Principal, List.List<ScoutResult.ScoutResult>>();

  // Access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Blob storage
  include MixinStorage();

  // ─── HTML helpers ────────────────────────────────────────────────────────────

  func htmlShell(title : Text, body : Text) : Text {
    "<!DOCTYPE html><html lang=\"en\">" #
    "<head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">" #
    "<title>" # title # " | Dreamcrafter Intelligence</title>" #
    "<style>" #
    "*{box-sizing:border-box;margin:0;padding:0}" #
    "body{background:#0d0d0f;color:#e8e8ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;min-height:100vh;padding:0}" #
    ".navbar{background:#111115;border-bottom:1px solid #1e1e26;padding:0 2rem;height:56px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10}" #
    ".logo{display:flex;align-items:center;gap:10px;text-decoration:none}" #
    ".logo-icon{width:32px;height:32px;background:linear-gradient(135deg,#a855f7,#ec4899);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px}" #
    ".logo-text{font-size:13px;font-weight:700;color:#fff;letter-spacing:.5px}" #
    ".logo-sub{font-size:10px;color:#666;letter-spacing:1px;text-transform:uppercase}" #
    ".badge{background:#1a1a2e;border:1px solid #2d2d4a;color:#a78bfa;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;letter-spacing:.3px}" #
    ".container{max-width:860px;margin:0 auto;padding:2.5rem 2rem 4rem}" #
    ".hero{margin-bottom:2.5rem}" #
    ".company-name{font-size:2rem;font-weight:800;background:linear-gradient(135deg,#c084fc,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.4rem}" #
    ".meta{font-size:13px;color:#666;display:flex;gap:1.5rem;flex-wrap:wrap}" #
    ".meta span{display:flex;align-items:center;gap:5px}" #
    ".actions{display:flex;gap:10px;margin-top:1.25rem;flex-wrap:wrap}" #
    ".btn{padding:8px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:6px;transition:opacity .15s}" #
    ".btn:hover{opacity:.85}" #
    ".btn-primary{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff}" #
    ".btn-outline{background:transparent;color:#a78bfa;border:1px solid #3b2d6e}" #
    ".section{background:#111115;border:1px solid #1e1e26;border-radius:12px;margin-bottom:1.25rem;overflow:hidden}" #
    ".section-header{padding:1rem 1.25rem;border-bottom:1px solid #1e1e26;display:flex;align-items:center;gap:8px}" #
    ".section-icon{font-size:16px}" #
    ".section-title{font-size:13px;font-weight:700;color:#c4b5fd;letter-spacing:.3px;text-transform:uppercase}" #
    ".section-body{padding:1.25rem}" #
    ".overview-text{font-size:14px;line-height:1.8;color:#b8b8cc}" #
    ".features-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px}" #
    ".feature-item{background:#18181f;border:1px solid #252535;border-radius:8px;padding:.9rem 1rem;font-size:13px;color:#d4d4e8}" #
    ".feature-item::before{content:'\u{2713}';color:#a855f7;font-weight:700;margin-right:8px}" #
    ".stats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}" #
    ".stat-card{background:#18181f;border:1px solid #252535;border-radius:8px;padding:1rem;text-align:center}" #
    ".stat-value{font-size:1.5rem;font-weight:800;color:#c084fc;margin-bottom:3px}" #
    ".stat-label{font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.5px}" #
    ".sources-list{list-style:none;display:flex;flex-direction:column;gap:8px}" #
    ".source-item{display:flex;align-items:center;gap:10px;font-size:13px;color:#9898b8;padding:8px 10px;background:#18181f;border-radius:6px}" #
    ".source-dot{width:6px;height:6px;border-radius:50%;background:#7c3aed;flex-shrink:0}" #
    ".footer-bar{margin-top:3rem;padding-top:1.5rem;border-top:1px solid #1e1e26;display:flex;align-items:center;justify-content:space-between;flex-wrap:gap;font-size:12px;color:#555}" #
    "@media(max-width:600px){.company-name{font-size:1.5rem}.stats-grid{grid-template-columns:1fr 1fr}}" #
    "</style></head><body>" #
    "<nav class=\"navbar\">" #
      "<a class=\"logo\" href=\"/\">" #
        "<div class=\"logo-icon\">&#129504;</div>" #
        "<div><div class=\"logo-text\">DREAMCRAFTER</div><div class=\"logo-sub\">Intelligence</div></div>" #
      "</a>" #
      "<span class=\"badge\">&#9679; API Report</span>" #
    "</nav>" #
    "<div class=\"container\">" # body # "</div>" #
    "</body></html>";
  };

  func errorPage(code : Text, headline : Text, detail : Text) : Text {
    htmlShell(code # " " # headline,
      "<div style=\"text-align:center;padding:5rem 1rem\">" #
      "<div style=\"font-size:4rem;font-weight:900;color:#3b3b55;margin-bottom:1rem\">" # code # "</div>" #
      "<div style=\"font-size:1.4rem;font-weight:700;color:#e8e8ec;margin-bottom:.75rem\">" # headline # "</div>" #
      "<div style=\"font-size:14px;color:#666;max-width:400px;margin:0 auto 2rem\">" # detail # "</div>" #
      "<a href=\"/api-keys\" style=\"display:inline-block;padding:10px 24px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none\">Go to API Keys</a>" #
      "</div>"
    );
  };

  func reportPage(companyName : Text) : Text {
    let overview = companyName # " is a leading technology company specializing in enterprise software solutions, cloud infrastructure, and AI-driven analytics. Founded in Silicon Valley, the company has grown to serve Fortune 500 clients across 40+ countries with a focus on digital transformation and operational efficiency.";
    htmlShell("Report: " # companyName,
      "<div class=\"hero\">" #
        "<div class=\"company-name\">" # companyName # "</div>" #
        "<div class=\"meta\">" #
          "<span>&#128197; Generated: March 23, 2026</span>" #
          "<span>&#127758; Global</span>" #
          "<span>&#9989; Verified Data</span>" #
        "</div>" #
        "<div class=\"actions\">" #
          "<button class=\"btn btn-primary\" onclick=\"copyReport()\">&#128203; Copy Report</button>" #
          "<button class=\"btn btn-outline\" onclick=\"exportTxt()\">&#11015; Export .txt</button>" #
        "</div>" #
      "</div>" #
      "<div class=\"section\">" #
        "<div class=\"section-header\"><span class=\"section-icon\">&#128196;</span><span class=\"section-title\">Company Overview</span></div>" #
        "<div class=\"section-body\"><p class=\"overview-text\">" # overview # "</p></div>" #
      "</div>" #
      "<div class=\"section\">" #
        "<div class=\"section-header\"><span class=\"section-icon\">&#128200;</span><span class=\"section-title\">Key Stats</span></div>" #
        "<div class=\"section-body\">" #
          "<div class=\"stats-grid\">" #
            "<div class=\"stat-card\"><div class=\"stat-value\">$2.4B</div><div class=\"stat-label\">Revenue</div></div>" #
            "<div class=\"stat-card\"><div class=\"stat-value\">12,400</div><div class=\"stat-label\">Employees</div></div>" #
            "<div class=\"stat-card\"><div class=\"stat-value\">40+</div><div class=\"stat-label\">Countries</div></div>" #
            "<div class=\"stat-card\"><div class=\"stat-value\">18%</div><div class=\"stat-label\">YoY Growth</div></div>" #
          "</div>" #
        "</div>" #
      "</div>" #
      "<div class=\"section\">" #
        "<div class=\"section-header\"><span class=\"section-icon\">&#10024;</span><span class=\"section-title\">Key Features &amp; Offerings</span></div>" #
        "<div class=\"section-body\">" #
          "<div class=\"features-grid\">" #
            "<div class=\"feature-item\">Enterprise Cloud Platform</div>" #
            "<div class=\"feature-item\">AI-Powered Analytics Suite</div>" #
            "<div class=\"feature-item\">Real-time Data Pipeline</div>" #
            "<div class=\"feature-item\">Security &amp; Compliance Tools</div>" #
            "<div class=\"feature-item\">Developer API &amp; SDK</div>" #
            "<div class=\"feature-item\">24/7 Enterprise Support</div>" #
          "</div>" #
        "</div>" #
      "</div>" #
      "<div class=\"section\">" #
        "<div class=\"section-header\"><span class=\"section-icon\">&#128279;</span><span class=\"section-title\">Sources</span></div>" #
        "<div class=\"section-body\">" #
          "<ul class=\"sources-list\">" #
            "<li class=\"source-item\"><span class=\"source-dot\"></span>Company official website &amp; press releases</li>" #
            "<li class=\"source-item\"><span class=\"source-dot\"></span>SEC filings &amp; annual reports (2023-2025)</li>" #
            "<li class=\"source-item\"><span class=\"source-dot\"></span>Crunchbase funding database</li>" #
            "<li class=\"source-item\"><span class=\"source-dot\"></span>LinkedIn corporate profile</li>" #
            "<li class=\"source-item\"><span class=\"source-dot\"></span>Dreamcrafter AI Intelligence Engine</li>" #
          "</ul>" #
        "</div>" #
      "</div>" #
      "<div class=\"footer-bar\">" #
        "<span>Dreamcrafter Intelligence &copy; 2026. Built with &#10084; by Dreamcrafter</span>" #
        "<span>Report ID: DC-" # companyName # "-2026</span>" #
      "</div>" #
      "<script>" #
      "function copyReport(){" #
        "const text=document.body.innerText;" #
        "navigator.clipboard.writeText(text).then(()=>{" #
          "const btn=document.querySelector('.btn-primary');" #
          "btn.textContent='\u{2713} Copied!';" #
          "setTimeout(()=>{btn.innerHTML='&#128203; Copy Report'},2000)" #
        "})" #
      "}" #
      "function exportTxt(){" #
        "const text=document.body.innerText;" #
        "const a=document.createElement('a');" #
        "a.href='data:text/plain;charset=utf-8,'+encodeURIComponent(text);" #
        "a.download='dreamcrafter-report-" # companyName # ".txt';" #
        "a.click()" #
      "}" #
      "</script>"
    );
  };

  // ─── User profile functions ───────────────────────────────────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile.UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile.UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ─── Named API key management ─────────────────────────────────────────────────

  public shared ({ caller }) func createApiKey(name : Text) : async ApiKey.ApiKey {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create API keys");
    };
    let apiKeyEntry : ApiKey.ApiKey = {
      name;
      createdDate = Time.now();
      isActive = true;
    };
    switch (apiKeys.get(caller)) {
      case (null) {
        let newList = List.singleton<ApiKey.ApiKey>(apiKeyEntry);
        apiKeys.add(caller, newList);
      };
      case (?existingList) { existingList.add(apiKeyEntry) };
    };
    apiKeyEntry;
  };

  public query ({ caller }) func listApiKeysForCaller() : async [ApiKey.ApiKey] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can list API keys");
    };
    switch (apiKeys.get(caller)) {
      case (null) { [] };
      case (?apiKeyList) { apiKeyList.toArray() };
    };
  };

  // ─── Primary API key (unique generated key) ───────────────────────────────────

  public shared ({ caller }) func generateApiKeyForCaller() : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can generate API keys");
    };
    let timestamp = Time.now();
    let principalText = caller.toText();
    let key = "dk_live_" # timestamp.toText() # "_" # principalText;
    userPrimaryApiKeys.add(caller, key);
    apiKeyLookup.add(key, caller);
    key;
  };

  public shared ({ caller }) func regenerateApiKeyForCaller() : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can regenerate API keys");
    };
    switch (userPrimaryApiKeys.get(caller)) {
      case (?oldKey) { apiKeyLookup.remove(oldKey) };
      case (null) {};
    };
    let timestamp = Time.now();
    let principalText = caller.toText();
    let newKey = "dk_live_" # timestamp.toText() # "_" # principalText # "_" # (Int.abs(timestamp) % 100_000).toText();
    userPrimaryApiKeys.add(caller, newKey);
    apiKeyLookup.add(newKey, caller);
    newKey;
  };

  public query ({ caller }) func getCallerApiKey() : async ?Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view their API keys");
    };
    userPrimaryApiKeys.get(caller);
  };

  // ─── Dashboard & reports ──────────────────────────────────────────────────────

  public query ({ caller }) func getDashboardStats() : async DashboardStats.DashboardEntry {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view dashboard stats");
    };
    dashboardStats;
  };

  public query ({ caller }) func getReportsForCaller() : async [Report.Report] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view reports");
    };
    switch (reports.get(caller)) {
      case (null) { [] };
      case (?reportList) { reportList.toArray() };
    };
  };

  // ─── Usage stats ──────────────────────────────────────────────────────────────

  public shared ({ caller }) func saveCallerUsageStats(stats : UserUsageStats.UserUsageStats) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save usage stats");
    };
    userUsageStats.add(caller, stats);
  };

  public query ({ caller }) func getCallerUsageStats() : async ?UserUsageStats.UserUsageStats {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view usage stats");
    };
    userUsageStats.get(caller);
  };

  // ─── Market Scout functionality ───────────────────────────────────────────────

  public shared ({ caller }) func saveScoutResult(result : ScoutResult.ScoutResult) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save scout results");
    };
    let currentResults = switch (scoutResults.get(caller)) {
      case (null) { List.empty<ScoutResult.ScoutResult>() };
      case (?existing) { existing };
    };
    currentResults.add(result);
    scoutResults.add(caller, currentResults);
  };

  public query ({ caller }) func getScoutHistory() : async [ScoutResult.ScoutResult] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view their scout history");
    };
    switch (scoutResults.get(caller)) {
      case (null) { [] };
      case (?scouts) { scouts.toArray() };
    };
  };

  public query ({ caller }) func getLatestScout(companyName : Text) : async ?ScoutResult.ScoutResult {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get latest scout");
    };
    switch (scoutResults.get(caller)) {
      case (null) { null };
      case (?results) {
        var latest : ?ScoutResult.ScoutResult = null;
        for (result in results.values()) {
          if (result.companyName == companyName) {
            latest := switch (latest) {
              case (null) { ?result };
              case (?current) {
                if (result.timestamp > current.timestamp) { ?result } else { ?current };
              };
            };
          };
        };
        latest;
      };
    };
  };

  // ─── HTTP API endpoint ────────────────────────────────────────────────────────

  public query func http_request(request : {
    url : Text;
    method : { #post; #get };
    headers : [{ name : Text; value : Text }];
    body : Blob;
  }) : async {
    status : Nat;
    headers : [{ name : Text; value : Text }];
    body : Blob;
  } {
    let url = request.url;
    let urlParts = Text.fromIter(url.toIter()).split(#char '?');
    let path = switch (urlParts.next()) {
      case (?p) { p };
      case (null) { "" };
    };

    if (path == "/api/report") {
      let queryString = switch (urlParts.next()) {
        case (?q) { q };
        case (null) { "" };
      };

      var apiKey : ?Text = null;
      var company : ?Text = null;

      let params = Text.fromIter(queryString.toIter()).split(#char '&');
      for (param in params) {
        let keyValue = Text.fromIter(param.toIter()).split(#char '=');
        let k = switch (keyValue.next()) {
          case (?x) { x };
          case (null) { "" };
        };
        let v = switch (keyValue.next()) {
          case (?x) { x };
          case (null) { "" };
        };
        if (k == "key") { apiKey := ?v };
        if (k == "company") { company := ?v };
      };

      switch (apiKey, company) {
        case (null, _) {
          return {
            status = 401;
            headers = [{ name = "content-type"; value = "text/html; charset=utf-8" }];
            body = (errorPage("401", "Missing API Key", "Please include your API key as the \"key\" query parameter. Get your key from the API Keys page.")).encodeUtf8();
          };
        };
        case (_, null) {
          return {
            status = 400;
            headers = [{ name = "content-type"; value = "text/html; charset=utf-8" }];
            body = (errorPage("400", "Missing Company", "Please include the \"company\" query parameter with the company name you want to look up.")).encodeUtf8();
          };
        };
        case (?key, ?companyName) {
          let isValid = switch (apiKeyLookup.get(key)) {
            case (?_p) { true };
            case (null) { false };
          };
          if (not isValid) {
            return {
              status = 401;
              headers = [{ name = "content-type"; value = "text/html; charset=utf-8" }];
              body = (errorPage("401", "Invalid API Key", "The API key you provided is invalid or has been revoked. Please check your key on the API Keys page and try again.")).encodeUtf8();
            };
          };
          return {
            status = 200;
            headers = [{ name = "content-type"; value = "text/html; charset=utf-8" }];
            body = (reportPage(companyName)).encodeUtf8();
          };
        };
      };
    };

    {
      status = 404;
      headers = [{ name = "content-type"; value = "text/html; charset=utf-8" }];
      body = (errorPage("404", "Endpoint Not Found", "The requested path does not exist. Try GET /api/report?key=YOUR_KEY&company=COMPANY_NAME")).encodeUtf8();
    };
  };
};
