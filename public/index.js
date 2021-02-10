'use strict';

var bolt = require('@slack/bolt');
var googleapis = require('googleapis');
var herokuLogger = require('heroku-logger');
require('dotenv/config');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var BYE = ["Doei.", "Hey houdoe he", "Dag.", "Groetjes.", "Dag, succes", "Yow", "Bye bye zwaai zwaai tot in den draai", "Dada", ":wave:", ":ocean:", "Ben ff jat kaffe halen", "Joa", "Edit"];
var GOODMORNING = ["Dag.", "Da bepaal ik wel?", "Goeiemorgen.", "Hallo, prettige werkdag", "Hey x", "Gegroet", "Hallo, veel coodplezier vandaag", "Morgend.", "Ben ff jat kaffe halen", "Goedemorgen op deze prachtige dag.", "Zwegt :error:", "Begint er es aan", "Waarkt es", "Goeiemorgen ;)", "Hallo!", "Moet gij nie werken ipv hier te lullen tegen een program", "Xoxo"];
var THANKS = ["Geen dank", "Graag gedaan", "Hup waarke", "Ok", "K"];
var WHERE = ["Genval", "Givet", "Arden", "Ostend", "Stadtkyll", "Thuis", "Slaapkamer", "Schipperskwartier", "Bewire", "Brasschaat", "'t stad", "Balen", "Baraque le fraituur", "Beauraing", "Caporal", "Burger Time"];
var HOW = ["Goed opletten", "Met mijn kut", "Gewoon je best doen", "Door toeval", "Door aan de mama van @Parno te vragen", "Door veel te trainen", "Geloof in jezelf", "Hoe, hoe, ge zijt zelf een hoer", "Ik weet het zelf eigenlijk niet", "Moet mij nie betrekken?"];
var WHEN = ["Nooit", "Soon.", "Zeer binnenkort", "Over enkele weken", "Volgend jaar", "Morgen", "Deze maand nog", "Deze week nog", "Vandaag nog"];
var WHO = ["@Jerre", "@Joa", "@Dennis", "@Rits", "@Kees", "@Jappeh", "@Crabbe", "@Slackbot", "Iedereen"];
var HOW_MUCH = ["Geen. Lol.", "Nul", "1", "2", "4", "8", "25", "33", "584", "Zeker honderd", "1000", "Teveel"];
var BASIC = ["Ik denk van wel?", "Zonder twijfel", "Zeer zeker", "Da weet ik nie", "Volgens mij wel", "Zeer waarschijnlijk wel", "Nee lol", "Kans lijkt mij groot", "Ja", "Kans lijkt mij klein", "Zeer twijfelachtig", ":ye: :boi:", "Niet hopen.", "Ik ben even weg. Jat kaffe halen", "Nooit.", "Incorrect.", "Affirmatief.", "Correct.", "Laat mij eens me rust vieze slet me al die vragen", "Ik heb het opgezocht en het antwoord is nee", "Mijn database zegt ja", "Vraag het aan @Jerre", "Nope.", "Yep.", "Excuseer? Pak van wel", "Kheb er geen idee van maar het zal wel"];

var SLUIP_IDS = ["yF-K9UYG1rQ", "KpxSQPNqfMA", "F53sg3ZbEhk", "JaecZn7_wYE", "5aT8Ri15Ya4", "pVVoVTrRTbI", "mkSxg-gLI5A", "g5eXjWu2KpI", "7QO9C8_8z1k", "7EO-cvDHwpQ", "5iPMfn2YZ4U", "_vtMMWO6nV0", "yl6GnXUzXWM", "ZZ_2QO7r_vY", "dI1R6x8CsSE", "WTZzygfS6Qo", "XOS-_4kOgcs", "IxP0Ri23zjw", "_b4399sTsEs", "cEGHj4WP5t4", "CbXA4zNzPCg", "1i1tALTHIOQ", "iHVkaILN5ew", "8mcfeLK5YNs", "7uJO4YXdt-Y", "DmYx2meguVU", "CvqpG2JCMw0", "svhsSsP2Poc", "LY7-7JzoPnY", "4IEIppT56m0", "0g5wkSz6zwU", "Nwgv8BpV2a8", "-X86G8UILx4", "R-X48mqelV4", "KAcrv4_E1Cw", "ZVIVWyFM1yE", "wAcaExt1RWg", "dQJiy3M4Vuc", "6FN9EFCEB6w", "QaJuciPb9Ug", "25OOsCmZ0uo", "HQh1HD5VyPI", "3BgSYmD88-U", "sSTxGf9TRzI", "j4HJmyx6t7o", "HwtoY1HrEp8", "rCr90k_GPLE", "CEsi496LA78", "y3XvL0o3_Og", "_mo0v8ZrvzA", "H-O3MLCNBzA", "h3alAK2L9Ms", "zyC2059tj20", "P07J0tAKzc8", "TBdOlqa3ZbY", "7Q2ud3p6nbQ", "bGl4MCdRhxY", "XlJSvYnlzKM", "DkplXCZLAY8", "O4b2rKf1QtI", "l5MvF8DGJuQ", "LkdfQw-uqt0", "-ibiQ6H6kAk", "z9sPZgV6FvQ", "-QtIrdiLoh0", "UMo9DezEAYc", "z5Qs3v_ZJUk", "UhpkBz6syDw", "XoSAvF9Ir8Y", "tnD-p1wNcvw", "jfO97nmWq-0", "-4crQYdd76E", "cOEXjMCn_dY", "eVhgo2J67o8", "U18VGYn_mMA", "pPQkl5Q7Oi0", "wqfBWTfRuJ8", "zLHkUgpFntk", "obtxaKzVNn4", "4aCTQ0AR1Is", "FAybUWPcaKg", "w_jwFrLd4TM", "0FEBDM-xAS8", "40M1MCB2WBA", "PrskJj9xV9w", "fJJJW_4D0rQ", "YUqDwAShgPY", "LwF8FKfrg7s", "J6vyqC4KhuA", "EdovbdB5d2s", "mqnC3at5IE0", "KgbzcOmn7F8", "hnXY4k6GfyA", "oBY0sxEHBm0", "R1S2ENsreyM", "i0VF1uNrTyI", "m5LMXVHLEQM", "nmlis7CwKts", "BA57saAmHAY", "82Y8JLywFkU", "quEhgWLDK1E", "fjP2Mor6Qyk", "tRQ8_CjSTPs", "foFDsPnxKCg", "S_7-d01TCLk", "SO2-IdRHftE", "10Pe2n7ZEFk", "Iat1Th4GCkw", "v1C3ZGhbWas", "rsZ0gE8DKnc", "H9yqTUy1U0I", "9uFNwpgHx4c", "zfwYgQEK_8E", "SPhy25e4f-o", "4n0yiihy6yA", "yk4rmSYeFB8", "yv1A29mqcSg", "bkkKSzue7n0", "4yzVtLUIM_s", "QcTjMRhNd4w", "eNrj0n3Ua7A", "V-lOSvdTQps", "yhc6H41oIjU", "s6Q3bloyBhM", "jxWev90C1Ww", "IFt-qE5sS48", "7exP39S7yWs", "MTiOMEUTBsc", "pwava1OHyHg", "XzIkvcjg9Cg", "OGrFb39l7PA", "UJxxu-kpDzc", "z_aLH3IYt8g", "mSmPt0LwGnU", "FVWFK38a58Y", "aGP9hQpAw5k", "Ty5tKjfrf3Y", "MlJHzTY2dr4", "nmmX8Fewmbc", "ESThM49ZNEs", "HhFDRZ0xqk0", "4Ml1Ok-lpKI", "jnV7CWNyWEE", "O-K1MzPncs4", "N4dkeNuzPsY", "kdLWN5ME9rk", "C8k40E42p2k", "Uca8NN9eRwU", "GMB69C5Kjag", "K039PwDCtqM", "0cdsiOvK56I", "Fk_nac8ge8s", "UeClvBNXOjE", "vOFYqnQMDHE", "5umtSkmiq2E", "TFcmrWm-sbk", "sn3HJU8Rb7k", "y44Tn4h0uDk", "r3uPmPNaDuA", "kN1gOaaJL5E", "kfEryMqybJo", "U7RZzMwOkNg", "aaXl8RC3YKQ", "W0IdiQ5b7JA", "WecW9jNEuY8", "Q1X-RIjeCCE", "LX_0H6dm8B8", "zL_QqzuzM9M", "hDGmgsYLXSU", "nwswme73_fA", "Jr6Z61EHzuc", "-lltoR32i9s", "SKE1DPgZ_Nc", "Vc3N8eGXmKM", "RbBw_Xc_NKI", "4n3WQ0J_Q2s", "nkl12xT2_NQ", "DMG-L8uZuGs", "SyF8FH802JE", "JCRK2CtrieU", "UKaMn-Id4XU", "OVsKgBoqEHY", "JhagOeoxGpQ", "5L-Vyj5HWTk", "Qknmnh2N74o", "IY9oe7qUudM", "NjEtsoxXDKU", "ejUumSki7iQ", "Zh6u60QlnUE", "JJB9h9ixJ6o", "-8gFtexJEps", "OJCARnmxpbg", "gJXeeb5txz0", "rjeNNOtJKLI", "qEt7gWn4cEM", "Z1hCWooui2A", "4enN3IYQa4Q", "fucMkeeAvtE", "Q9pkA0F7EWA", "sKRHkXwbGcU", "uO1ZTO-T73A", "DMXIXRAvYow", "TJWmZQUPuk4", "u8BTVLeOzrg", "sz3Z2ZG7nUs", "diOl1JKNqj0", "6yf8u9xs16c", "qNif1QJ6ouE", "PdEBvbkz6Tk", "2QLxQEWDuns", "ic6t5GbTTZg", "YKlM4VA_dLM", "D-Kia_WNA_A", "wH9lJH7Fu-0", "eVGdQ9ZMnnA", "N-lIu9ygxH8", "Y_ZCgNny5QE", "qxfRuua--6w", "fYq_8LyUqzE", "E_pIvZrx-eY", "olszEMs1DRg", "bMT4R_6fKoM", "x1tfidWXMjc", "EtuS3b9uKaA", "WmTiE1m7N6U", "LtpIQPgO5J0", "EH59xvd2KPI", "x7QLk1hr-28", "nEDVsPotVB0", "H0kYytZB7lQ", "-l0hoMjt_WI", "U6d5KMdzFMQ", "A7MOqZz_l4M", "ES3vynprkRU", "ACgGNXdzYts", "wm9xMRe0DzI", "0j4VBEzw_oY", "SYo4w0Y_Tkw", "oCRzawtq4xk", "tfSyfGjrIHc", "AGYq7NQ0RyI", "EqhhqoUAAfs", "-Dt2joev3sE", "_5lwmaq6FYE", "22ZI5G_X0D4", "_CaJJ7SUQwg", "NLJ-SFaxBZ4", "kDk-yl2sfmY", "IqyCv3_EHLg", "3Qhj1X6uaQY", "vatfM7WYyYE", "pP-8vw6IQEw", "P8-7zDcMFyo", "N4piy3W3ON8", "qDHa5ObUNtk", "0upzjm99SQA", "g_fi3-VpYxs", "ttK-HYQ9zjk", "53anPPl-DGY", "OBtcyXNJlQs", "81MGZUtojSo", "drHZyVle6go", "QRT2mrCBlv0", "_YHM8_ujguc", "gRwelfZX5cw", "Ez-pFYYHG2A", "7GcIIr1-zF0", "WUUdPZr-WU8", "UBK_-Mtw1Es", "yaOydqdWa3k", "19cp6hkklLk", "9kQBUutzlX0", "1fAnVRQc0fw", "bMXoBlM9dTA", "iknGR8bu_A0", "JtSlge-LJrU", "XkBDuL5ZZLo", "WoJrRcEvCwE", "yFtkVcxzZOY", "2Xg9Nsu_ZYM", "9eZdlYtEtwY", "fxshtRoZEwk", "oo9b62JU2vs", "kpW5J-gPzoI", "jCzuw1aTfLo", "2PRCaUeicG4", "bM1Kqo-9S3A", "W4UDjmEBMlk", "SApXI2VWKXg", "00Wel2e_B5U", "EVJkZmEDpyw", "rrincSNb9s4", "gRJMgZFcGjM", "pzhNitispLk", "c52Y2poTXjU", "WfDUciHPYH0", "3Td2nlllZiI", "HE5czY-3now", "AnvESSfnF4M", "KeZNTjPsZTI", "BoOHF5u9zWk", "Q5avw8haBlw", "g24ah4fFjvo", "_UEae-5clJ8", "ayhtXyjn3_k", "eIeFX67mDFY", "poJ0iEH7Thw", "x2B6T8SF8gY", "G3TogUXwRz4", "ASP6XJjOBQM", "d3gC-Um7TAI", "kysqv96hZxQ", "9i9_2LGRarw", "oPphsmDbOEc", "bSR3l0znMvA", "tYN51ShckKc", "bm2mwrUiFZE", "Qv5JWZGZ0qE", "WJg3aZoOUfY", "esknsRs4cto", "nvPxnygZZBU", "k_m5KNfOTqk", "zhvPUgCeJsI", "sBMoZTYPcHg", "bEtCtcRXACA", "eADMXMIlXRM", "g_yS2NWyjy0", "Scz7Kgnvlg8", "WXnfyIL4AfM", "JZziINb7CyQ", "Q1BZouHyoMk", "VhpIUeu2-Eo", "XJ25m9QIc20", "UPVKmPzVpdE", "3JMUAij_Vb8", "UX6K4X1xEG8", "i5JfV6BZRlk", "EDSBTFnP6dY", "n9bNL4ho_Kk", "oiB9mqM4W5k", "joOaPKx3rJE", "fS7TnwGo3yo", "LWmQ3nsWY4A", "M_KDlS5sKjE", "KFgc1vBz2pE", "RXMxKMnCP0Q", "nW0JiR6jq70", "GiCCXO97-cY", "aZuRqxmKdlM", "BYUj50lhy3o", "fhhVOMQHUws", "VHx7hyqKczE", "5Wq7gKV4ApE", "jjlzOScUPuI", "rTTo3CsqDaM", "rA0NIbklYkM", "zxl9JyLWhb8", "HUwkbc0YScM", "d1XC4WtYfrU", "e1hTvcKugk0", "_W1OKtkV3co", "QgQ8ws2fn_k", "jOYFPm_9uTY", "UUfEDCvGMxE", "q23o4ezPvd8", "ty8huJM55oI", "tg5-vy5EgFE", "vsPIpwKvsF4", "d_CyQs4oNFM", "L7by-5Ae258", "NC_Mu0rNz08", "IIqN7fFHbJ8", "_FFEQBB9pTs", "grhv2rsvtP4", "lD1eY53i9V4", "r_p-gs8djfI", "lcsdR7fumok", "cAEuHgw_ZHA", "n_oA-_KSKVI", "6o2P6YbHfqw", "cufaAV_dPx8", "CdESUvcaL3M", "ruv0tX82r9A", "Fv1zjPzDKFs", "q4XMCQYpE4c", "zCxtyy_Ay-Q", "4yaFl2wpFsE", "HoCOJy59phk", "x9fT5s2-Feo", "2vV7O7jG0QE", "e2vWgXED310", "zG7oqKUbo1o", "SPNLzgTAVTM", "zhVaeqCigFU", "LQmqpeMNPGk", "SWo-BRuKOpY", "fIRW_Bt8GKY", "rZsNq9fOAB8", "Bfr_dRebtmk", "X0zyExkPBc0", "fUdFv7EV0Hw", "3Sz-S5EmOSs", "I90SAxJsFUU", "Og1ERZ-pXcg", "jhF0B8Cn2_E", "D2pjQDSa2Jk", "hHh05MCdkjQ", "x7XjMnZUDFI", "-rtg-KM40PQ", "SxF1sEalB68", "5DftR4FpePk", "zbL-UAgtZVk", "EHKYQVlEgT8", "ENQ-khEPRUg", "CynsjZ2eHRw", "vcKQtlwvFDc", "rAif1DZrfWU", "HPR1bX2XOt0", "yaDmtx9-AvU", "IVJU4M4EHLM", "5jrMEkWopWk", "tx5WOzzxgNM", "NnVp_epEf1Q", "RjHGpghvLjo", "zvVNiPThzdw", "qFSjBDYQMJQ", "FxgE0sZKcik", "NteZd5iwPeQ", "8XaZHYfwrKg", "OFXdTjIbiPw", "yKu6fqaZKUo", "DgYgecMZenU", "8D4ZU3lvzEU", "bJTEk2sdJW8", "dTe61KT7Q6c", "9nVu2Y4QiiU", "fZxnpja87dY", "8uB9eUz2hMU", "Q5XBv3kGPqU", "kKyDLI1NooU", "HdjesDKCzIE", "_BIc3eVACEQ", "BG1nn23qlXc", "D5wRJ6QdpBc", "Ghwefg56o8g", "zg4h4R5qK7I", "ZbwOWsHzwKo", "zMSfp4p_L6E", "45CROWbhfsI", "YmF9cR7EPbo", "HspQFQicfM0", "rPG1aUqySuQ", "VtcNV3kqgYo", "mC32k9602nQ", "J8HrZXcCveQ", "ib1E5ExdOUE", "1M15GdvYPFk", "_C21H0QqDVU", "CfO7JRxvnrw", "fcCvUFlokcY", "eOdmsVaUbRs", "0a_4Aczrlbw", "rYbmU27SX54", "aZBTfCl6nW8", "S5sk0uEhWfs", "JuQVIT5gE74", "aBrLCxBnNZY", "iYCXTwD-_Sw", "Byop9ws8olY", "GHx2dVFzbU4", "aLv4-bL12-Q", "oHHtl2xlSFE", "metl7sz7xjE", "srwcS1sqd4g", "AjefM82nehI", "mV16kA-XSsU", "x2EYp8xrkZc", "Gl67KKfArzk", "3HMYYkDH53g", "Rj5P0fwvCNw", "7JqeqibwSdE", "i4fnYu1C2zA", "qGzmjCfT5c4", "RZoxleUpUi8", "gQBvlrHvXqA", "zNZDSBS_P_4", "7WFNKQSdaiU", "08wAK4TpT1M", "3ff_5c0CIjg", "fXL6q6TQFi4", "boLiump6O9E", "ESwI3Wr1n2g", "fGYSbpuRe0s", "oz_nup6y52M", "7t9oQ08q7Hg", "7EYQCTdzPp4", "HaeeExdFTEI", "x56Ea_2ztbk", "NB9fLRnOLEY", "3p9JMfUEZEM", "LHkBPiJjGoA", "RpqdLCURcqs", "KayY7ttj8g8", "VzYFtIs4N0s", "AXTtjxYvvx0", "WSFn3Vt1Jfs", "jHxSyuzYFNg", "Jnt_fJQnorc", "_aNAVqaURz0", "WjaGquThWO8", "T3UJjjecLMQ", "cVmkfNlakGM", "kpoQ5NFISJ4", "UZZH8TOKnyU", "lx1hfJJERK0", "EfDCL-yUUXw", "lTmgKyt98Xs", "WOIYAaHRrSI", "4mxGDNuPzOM", "KqhHesQ8PP8", "68At0bPKD0s", "KzSws-XBtPQ", "McbhSBNMLws", "uup2oU_XSqM", "FhdSLDu6kZY", "tL4EY6FLojo", "udj42YC3uOk", "SYe7lsyISk8", "J2Jn-FleOEs", "f1OnlQUrIWQ", "eOarsBpXrME", "i0Hmo3fkt_I", "vVJ0n1SyHqk", "K9eeHDNAtRo", "F3epMmBC-4M", "DJKOUJwJg1I", "dxNl7RCO-qE", "65qlInp-zdg", "q2c9y2RaFLU", "iEleq1k6McM", "WTij9oUmhOo", "RlFuZcSdsDc", "gW958ZPMnMA", "-c9jbdTM_Wk", "oPQ58dKAq40", "U4Q4oyoUT_k", "8hzIPb2UXgc", "tgYqQDAk3nY", "WjvayQOvFGs", "savgPTF8zzU", "1yMak78-6m4", "Tk_yarjeFxE", "RGspKEqDCEo", "NJ9c-C1qoo4", "kYT8k8_WFo8", "Lmq3DvmpLV0", "pATG-3FyTN8", "DSUrNkcKRlc", "Hy7rws3mQ0o", "GVzHJjRiOuI", "osemJiEszq8", "_OQfSMwFiX0", "HMnzXnbWQeg", "fHPo8JqRHbQ", "y1gneEX4TaM", "JgepZCthjok", "5obC6kEENb0", "p-IiL0qfA2M", "Xh8wyar1nBQ", "g4p-dLAPgnE", "w4eloycLYC0", "LrMrK2SFzSk", "wnHk2ocDjf8", "RFuw3LtWKL4", "9ykXK8RozL8", "K9Ea-Mje9Eg", "yL_c55Zvm-w", "N_bGeACeiHI", "L6WoXrfvyRQ", "_snLGdQjxsY", "XVBill7IVxo", "DcHyNbhM0G8", "8lD0fz49EwI", "tpkkesiO1sQ", "SOyww6aGRHQ", "_NBJYbB9HbM", "N0O2daDMCm8", "xN14SezN4-E", "KkLStGa1Jr4", "32UzeIaa5rY", "itiORIVtUqs", "xtKjSeeEUI4", "Elbb0VlWPxQ", "SdFY85eqlOY", "wEMh87IwmNY", "TmpN6BmPMG0", "hdh5S988LGI", "WtgKL-xzeHI", "FLfS_mDjtuA", "Lf2Hxr8AygI", "IQYoRbbhPXw", "yKvNz6NNdOU", "jPZm6t7A9Y0", "7je8BBs5zJM", "0SM7eYaujZw", "u3g_C5wWejk", "QFM9H8kgex0", "VlKP4fFCHkk", "1W2ffTvO9Ts", "9WxHUiecPAI", "J47l3NoipLc", "qVa0ZHrrqOk", "EZmnwb-ARZ4", "BDGR12Umnz4", "5EqB3N2LJFg", "b32-eWLkQ-0", "93WoOfpmDXg", "XhchsLaw_5k", "NNuZHaLA6tY", "5cAT8kM7pRw", "nTCXrmuF5Fs", "BSVQ0vFU8vg", "DzFNjrxL12Y", "Q15B0o4slkA", "d_D9zHGsgd4", "xMUqjztlKRw", "Kvxp5fnfCP8", "o_XvwlEd4o0", "4jeHbIAJSK8", "jUAeNcaw4r8", "UOhGLEQ2TgM", "pB06o5szEXY", "sHwlnDUJG0w", "qEvsvfSy_bg", "So2E8AUnlYA", "x_DNE_7t_7g", "EYKKhtLM4jc", "NiUGmVinoSQ", "NfoHivZo5b8", "TaDIGjlyHug", "GfhJBXiTkE0", "JdlCq7mkOVY", "T4dFuf5wDaQ", "sCxN5poWoTs", "E3gNLTb8gYI", "jJAEp3a8whw", "8BfvTJuowh8", "3w61UVt0xYc", "sHQgu6ZTxPY", "L2cO3w8VN48", "LnJNpFDHnBI", "xuLg-ciKO0c", "IRWOizHvj7I", "96Ixz8PvA7s", "aJoEqiXvTZI", "xv9CpaTUUh0", "TGVoyf-TFJM", "JqYo1KAvPig", "9ai43_09gCI", "x-vcKgEUJbk", "VN4pd7D4lJQ", "bx-OxTc89gs", "vn26hsOrUHw", "Yyx9zksTOt4", "KqWkPBeeUZY", "eP0n-VJJClo", "L1sUVWWkAQI", "Mg2laqs23fg", "80kHr7vgwdQ", "Cfb_9R3bays", "WhRV6-Utwks", "C-ClP5Wxp8I", "MGSKyyJs76w", "oF38pmE_ZRM", "s3Qw5KDIm24", "omAPWfz25c8", "6EQjeKYJ0Rw", "4db_PcK0-Q4", "0FdYG7g6o-4", "Lt7bKh8imqQ", "cFAuO8q1B04", "Nd1-RSJqiVs", "56zinMrTIpY", "TjLkJjCoS1o", "tTCYgi5VSdM", "LU3mLSCZOvo", "PmKGMFnMg9o", "-3oWsfU61Vw", "-PYqwPUevRQ", "IDflj1GwtX4", "azZOiO4hkmc", "zq8fpth1vO0", "XI_oeUMUYhA", "zmeS-xjskoE", "9DyUsbw10bY", "UQcKOLWF2Lk", "4VI_Ot_0FvM", "W_wu_IuGxuI", "D43mWxhs4i4", "pqkAVgyAmWw", "RA0zgVNj1PA", "SA6WQSE0g_4", "ihcLQBW4JIU", "KqX9TJ4oRcU", "HEgUriuAmmc", "5nObH6v3FaE", "2Cq4Fl_u7lI", "7X_R19dGbi8", "tLhRoEbg2ZA", "VV1ANmSkyJc", "JptkMl-wmnk", "nCTIs4zegu4", "n9EUgt9xM68", "35Ssv_oP5VY", "JygooYyxK-Q", "MmQAqaJ52YI", "y_RUSNjBoqU", "_oSSjhUf6qk", "xkosOettSSg", "43lG2cKdbzk", "vSxY5YrVjTw", "RroJdZaBXCk", "Ic3FUNYgGcE", "LoVI1KkasYY", "Jjoay315zyQ", "j_gJLXaUZn4", "aZAYUrSlges", "V1j4DAbdFqE", "bug25U7DKSk", "nC1U6ZyP8nI", "YfCoVOHuNYk", "Y_ugoAq9mo8", "BsCDDOxt7VM", "BsfUXq61mV0", "NzGkJqhKVR0", "YCTTHvtJhbo", "hZbzSLs_iiY", "PNsFjqqxadQ", "jOlsUFlsngY", "4X5dRc41gOc", "uPGB3hcMiZc", "FltZgfgC8XE", "A0ki0x6jKag", "f8j4v_cY5mA", "TskR7cVpR40", "hUeYN8sHZqc", "ZLyHrzKKbXE", "UqV7u8j_6BA", "9N7wZcPYpjE", "eQ1mdJGhWs8", "fdbKTacPbz0", "YbU81GxV5bw", "L8ER1t0Des0", "5EGVSseVSOY", "bA6I3QQakKM", "_dKxVdBC_PY", "rtHyy649GaA", "bp2iLYS1g1Y", "6BWgeY0YYnA", "uIvjkzKjTCw", "Ao4WQX_6p7s", "raY8PO9P64I", "FzWHkD-7fuo", "MFNQsYN9xOs", "SlwKdL007Bo", "5OIR56l-MUU", "D4uw8_R2FM4", "gE1HRikXBEY", "4ZHg_qlEBAE", "5LAe6ECu30g", "6e4XjRS8KFY", "ssCsqVTatGg", "NzrMJuJWIMw"];

var app = new bolt.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

var getRandom = function getRandom(length) {
  return Math.floor(Math.random() * length);
}; // let youtube;


app.event("app_mention", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var context, event, token, channel, text, response, youtube, result, index, message;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context = _ref.context, event = _ref.event;
            token = context.botToken;
            channel = event.channel;
            herokuLogger.logger.info('app_mention', {
              token: token,
              context: context
            });
            text = event.text.replace("<@".concat(context.botUserId, ">"), "").trim();
            response = "Ja?"; // calculate response
            // console.log("text", text);
            //console.log("event", context, event);

            _context.t0 = true;
            _context.next = _context.t0 === /^(versie|-v|--version)/.test(text) ? 9 : _context.t0 === /^(hoeveel|hoe veel)/.test(text) ? 11 : _context.t0 === /^wie/.test(text) ? 13 : _context.t0 === /^wanneer/.test(text) ? 15 : _context.t0 === /^hoe/.test(text) ? 17 : _context.t0 === /^waar/.test(text) ? 19 : _context.t0 === /^(bedankt|thanks|thank|dank)/.test(text) ? 21 : _context.t0 === /^(goeiemorgen|goeimorgen|morgend|murgend|goedemorgen|goedemorgend|daag|gedag|ey|hallo)/.test(text) ? 23 : _context.t0 === /^(dag|salut|ciao)/.test(text) ? 25 : _context.t0 === /^(sluip|humor|sluip random|youtube sluip random)/.test(text) ? 27 : _context.t0 === /^(zoek|zoek youtube|muziek|random)/.test(text) ? 30 : _context.t0 === /^(youtube|exact|zoek exact|geef video over)/.test(text) ? 37 : 43;
            break;

          case 9:
            response = "1.0.0";
            return _context.abrupt("break", 44);

          case 11:
            response = HOW_MUCH[getRandom(HOW_MUCH.length)];
            return _context.abrupt("break", 44);

          case 13:
            response = WHO[getRandom(WHO.length)];
            return _context.abrupt("break", 44);

          case 15:
            response = WHEN[getRandom(WHEN.length)];
            return _context.abrupt("break", 44);

          case 17:
            response = HOW[getRandom(HOW.length)];
            return _context.abrupt("break", 44);

          case 19:
            response = WHERE[getRandom(WHERE.length)];
            return _context.abrupt("break", 44);

          case 21:
            response = THANKS[getRandom(THANKS.length)];
            return _context.abrupt("break", 44);

          case 23:
            response = GOODMORNING[getRandom(GOODMORNING.length)];
            return _context.abrupt("break", 44);

          case 25:
            response = BYE[getRandom(BYE.length)];
            return _context.abrupt("break", 44);

          case 27:
            console.log("sluip test");
            response = "https://www.youtube.com/watch?v=".concat(SLUIP_IDS[getRandom(SLUIP_IDS.length)]);
            return _context.abrupt("break", 44);

          case 30:
            youtube = googleapis.google.youtube({
              version: "v3",
              auth: process.env.YOUTUBE_API_KEY
            });
            _context.next = 33;
            return youtube.search.list({
              part: "id,snippet",
              maxResults: "50",
              q: text
            });

          case 33:
            result = _context.sent;
            index = getRandom(50);
            response = "https://www.youtube.com/watch?v=".concat(result.data.items[index].id.videoId);
            return _context.abrupt("break", 44);

          case 37:
            youtube = googleapis.google.youtube({
              version: "v3",
              auth: process.env.YOUTUBE_API_KEY
            });
            _context.next = 40;
            return youtube.search.list({
              part: "id,snippet",
              q: text
            });

          case 40:
            result = _context.sent;
            response = "https://www.youtube.com/watch?v=".concat(result.data.items[0].id.videoId);
            return _context.abrupt("break", 44);

          case 43:
            response = BASIC[getRandom(BASIC.length)];

          case 44:
            message = {
              token: token,
              channel: channel,
              text: response
            };
            _context.next = 47;
            return app.client.chat.postMessage(message);

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return app.start(process.env.PORT || 8080);

        case 2:
          herokuLogger.logger.info('Starting server', {
            port: 8080
          });
          console.log("⚡️ Slakbot is running!");

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))();
//# sourceMappingURL=index.js.map
