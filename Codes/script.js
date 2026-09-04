/**
 * PattiPani.com (പട്ടിപ്പണി.കോം)
 */

function playBarkSound(pitch = 600, duration = 0.15) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + duration);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.log('Audio unsupported');
  }
}

// Helper to calculate rating dynamically from reviews
function calculateDogRating(dog) {
  if (!dog.reviews || dog.reviews.length === 0) {
    return "0.0";
  }
  const total = dog.reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0);
  return (total / dog.reviews.length).toFixed(1);
}

// 10 Pre-uploaded Dog CVs following exact requested structure
const defaultProfiles = [
  {
    id: "dog_1",
    name: "കോഴി കുമാർ",
    role: "ചീഫ് സ്കൂട്ടർ ചേസിംഗ് ഓഫീസർ",
    territory: "വായനശാല ജംഗ്ഷൻ മുതൽ ആറ്റുകാൽ പാലം വരെ",
    tag: "വലതു ചെവിയിൽ എബിസി സൊസൈറ്റിയുടെ കട്ടിംഗ് (Verified Tag)",
    teeth_count: 28,
    teeth_condition: "ചിത്രത്തിൽ കാണുന്നതുപോലെ നല്ല ഒന്നാന്തരം കൂർത്ത പല്ലുകൾ. (മുകളിലെ ഒരെണ്ണം കഴിഞ്ഞ വർഷം ഓട്ടോറിക്ഷയിൽ കടിക്കാൻ നോക്കിയപ്പോൾ പോയി).",
    bite_record: "ഇതുവരെ ആകെ കടിച്ചത്: 3 പേരെ (രണ്ടു പോസ്റ്റ്മാൻ, ഒരു കളക്ഷൻ ഏജന്റ്). സൈക്കിളുകാരുടെ കാൽമുട്ടിൽ കൃത്യമായി പല്ല് തട്ടിക്കാനുള്ള ഫോക്കസ് ഉണ്ട്.",
    isHired: false,
    photo: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVubnklMjBkb2dzfGVufDB8fDB8fHww",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrrQDK_7Djaw5NQuM22FRmF_t0QNmo83hs0P-ZWZRW8Q&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEs678cE3GVJz1gIfj7xaIrHvrYySuKPibPOjfsFwVBA&s=10",
    work_experience: [
      {
        title: "സീനിയർ നൈറ്റ് വിജിലൻസ് ഓഫീസർ (Senior Night Patrol)",
        org: "പഞ്ചായത്ത് റോഡ് ഗാങ് (2021 – നിലവിൽ)",
        details: ["രാത്രി 2:15-ന് അയൽവക്കത്തെ 12 പട്ടികളെ ഒരേസമയം കുരപ്പിച്ച് ഉണർത്തുന്നതിൽ 100% വിജയം.", "ബൈക്കുകളുടെ പിറകെ 60 km/h സ്പീഡിൽ കുറഞ്ഞത് 200 മീറ്റർ ഓടിച്ചിട്ടുണ്ട്."]
      },
      {
        title: "അസിസ്റ്റന്റ് സദ്യ ഇൻസ്‌പെക്ടർ (Assistant Sadya Inspector)",
        org: "കല്യാണമണ്ഡപം ബാക്ക് യാർഡ് (2019 – 2021)",
        details: ["പായസം ബക്കറ്റ് കഴുകി വൃത്തിയാക്കുന്നതിൽ പ്രത്യേക വൈദഗ്ധ്യം.", "ഇലയിൽ നിന്ന് വീഴുന്ന ചിക്കൻ അസ്ഥികൾ 0.05 സെക്കൻഡിൽ ക്യാച്ച് ചെയ്യുന്നതിൽ റെക്കോർഡ്."]
      }
    ],
    skills: [
      "മിണ്ടാപ്പൂച്ച പോലെയുള്ള ഇലക്ട്രിക് സ്കൂട്ടറുകളെ മുൻകൂട്ടി തിരിച്ചറിയൽ",
      "റോഡിന് നടുവിൽ കിടന്ന് ട്രാഫിക് തടസ്സപ്പെടുത്തൽ",
      "പോലീസ് ജീപ്പ് വരുമ്പോൾ മാത്രം മാളത്തിൽ ഒളിക്കൽ",
      "കല്ലെടുക്കാൻ കുനിയുന്ന ശബ്ദം കേട്ടാൽ 0.1 സെക്കൻഡിൽ സ്ഥലം കാലിയാക്കൽ"
    ],
    reviews: []
  },
  {
    id: "dog_2",
    name: "മീൻചന്ത സുബ്രഹ്മണ്യൻ",
    role: "അസിസ്റ്റന്റ് സദ്യ ഇൻസ്‌പെക്ടർ",
    territory: "ചാകര ചന്ത മുതൽ ബോട്ട് ജെട്ടി വരെ",
    tag: "ഇടതു ചെവി വി നോച്ച് (Verified Tag)",
    teeth_count: 30,
    teeth_condition: "മീൻ മുള്ളുകൾ കടിച്ച് പൊടിക്കാൻ പാകത്തിലുള്ള വശങ്ങളിലെ കരുത്തുറ്റ പല്ലുകൾ.",
    bite_record: "ഇതുവരെ ആകെ കടിച്ചത്: 1 പേരെ (മത്സ്യച്ചന്തയിൽ തട്ടിപ്പറിക്കാൻ നോക്കിയ പൂച്ചയെ).",
    isHired: false,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqH4Oepht_zDU9QuIZ5iLBVt-rRJeKUIEkH1z45J9zrg&s=10",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALyQFkI4ULAMyskARFgyWfYYbuBj_Wok-cAPfgSsT-Q&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZbxQ6ykGmB-Wp_1bej4E1G_RfJal3ZRijMqF9ipRTzQ&s=10",
    work_experience: [
      {
        title: "ചീഫ് വേസ്റ്റ് ആൻഡ് ഐസ് ബോക്സ് ഇൻസ്പെക്ടർ",
        org: "ഹാർബർ മാർക്കറ്റ് സ്ക്വാഡ് (2020 – നിലവിൽ)",
        details: ["ചന്തയിൽ ഐസ് പെട്ടി തുറക്കുന്ന ശബ്ദം കേട്ടാൽ 1 സെക്കന്റിൽ എത്തുന്ന വേഗത.", "മത്സ്യ വാനുകളുടെ അടിയിൽ കിടന്നുറങ്ങി സുരക്ഷ ഉറപ്പാക്കൽ."]
      }
    ],
    skills: [
      "മീൻ കൊട്ടയിൽ നിന്ന് വീഴുന്ന നത്തോലി വായുവിൽ വെച്ച് പിടിക്കൽ",
      "മാർക്കറ്റ് അതിർത്തിയിൽ പൂച്ചകളെ പ്രവേശിപ്പിക്കാതിരിക്കൽ",
      "ഐസ് വെള്ളത്തിൽ കിടന്നുറങ്ങാനുള്ള കഴിവ്"
    ],
    reviews: []
  },
  {
    id: "dog_3",
    name: "ബ്രൂണോ ബ്രദർ",
    role: "സീനിയർ നൈറ്റ് വിജിലൻസ് ഓഫീസർ",
    territory: "റോയൽ ഓഡിറ്റോറിയം ജംഗ്ഷൻ",
    tag: "കഴുത്തിൽ നീല ടാഗ് കളർ",
    teeth_count: 26,
    teeth_condition: "രാത്രി വെളിച്ചത്തിൽ തിളങ്ങുന്ന നല്ല പാൽ പല്ലുകൾ പോലെയുള്ള കൂർത്ത പല്ലുകൾ.",
    bite_record: "ഇതുവരെ കടിച്ച അനുഭവം ഇല്ല. കുരച്ച് പേടിപ്പിക്കുന്നതിൽ മാത്രമാണ് ശ്രദ്ധ.",
    isHired: false,
    photo: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRod7lYmZ19x90zkiIvBPWe2_2qsb_ARphhJ_NEcLONwg&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1qK_fF0hKFVxDPWUgbecaKZ_GU5SkQ2FzZrqJczfJg&s=10",
    work_experience: [
      {
        title: "ഓഡിറ്റോറിയം നൈറ്റ് സ്ക്വാഡ് ലീഡർ",
        org: "കവല റെസിഡന്റ്സ് പട്രോൾ (2021 – നിലവിൽ)",
        details: ["രാത്രി പത്തു മണി കഴിഞ്ഞാൽ അപരിചിതരായ നടപ്പുകാരെ പിന്തുടരൽ.", "മറ്റ് വാർഡുകളിൽ നിന്നുള്ള നായ്ക്കളുടെ കടന്നുകയറ്റം പൂർണ്ണമായും തടയൽ."]
      }
    ],
    skills: [
      "ഉയർന്ന പിച്ചിലുള്ള ശബ്ദമുണ്ടാക്കി കുരയ്ക്കൽ",
      "തെരുവ് വിളക്കുകൾ ഓഫായാൽ ഇരട്ടി ജാഗ്രത പാലിക്കൽ",
      "ബൈക്കുകളുടെ ശബ്ദം ദൂരെയ നിന്ന് തിരിച്ചറിയൽ"
    ],
    reviews: []
  },
  {
    id: "dog_4",
    name: "സുന്ദരി ബാബു",
    role: "ചീഫ് വിരട്ടൽ എക്സിക്യൂട്ടീവ്",
    territory: "പഞ്ചായത്ത് ഓഫീസ് റോഡ്",
    tag: "വലതു ചെവി വി നോച്ച്",
    teeth_count: 28,
    teeth_condition: "വളരെ മൂർച്ചയുള്ളതും ഭയപ്പെടുത്തുന്നതുമായ നാടൻ പല്ലുകൾ.",
    bite_record: "ഇതുവരെ കടിച്ചത്: 2 വിൽപനക്കാർ (അനുവാദമില്ലാതെ പരിസരത്ത് വന്നവർ).",
    isHired: false,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdtRSZ5JRdy4hpEWejviYPBrXRqK7iX_RVYNaH3F4yPQ&s=10",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMst8p8urN57-DLdTr3ANqm-FT5vzZ0cXdCn-1hOyfC0WlbLSad-pOI925&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH4PhwF4xdbfx4zjaTT3FT8Lzn48BR_Bqsw3Y5V6m4tg&s=10",
    work_experience: [
      {
        title: "ചീഫ് വിരട്ടൽ ഏജന്റ്",
        org: "വാർഡ് 4 ഫ്രീലാൻസ് വിങ് (2022 – നിലവിൽ)",
        details: ["അപരിചിത വാഹനങ്ങൾക്ക് കുറുകെ ചാടി ബ്രേക്ക് പിടിപ്പിക്കൽ.", "രാത്രികാലങ്ങളിൽ പോക്കറ്റടിക്കാരുടെ പിന്നാലെ കുരച്ച് വിരട്ടൽ."]
      }
    ],
    skills: [
      "കണ്ണുകളിൽ നോക്കി ഉറക്കെ ഗർജ്ജിക്കൽ",
      "സൈക്കിൾ സവാരിക്കാരെ തന്ത്രപരമായി വട്ടം വെക്കൽ",
      "ഭക്ഷണം കാണിച്ചാൽ പെട്ടെന്ന് സൗഹൃദത്തിലാകാതിരിക്കൽ"
    ],
    reviews: []
  },
  {
    id: "dog_5",
    name: "കടുവ ഷാജി",
    role: "സീനിയർ നൈറ്റ് വിജിലൻസ് ഓഫീസർ",
    territory: "ആലത്തൂർ പാലം കവല",
    tag: "വലതു ചെവി കട്ടിംഗ് തുന്നൽ ലൈൻ",
    teeth_count: 32,
    teeth_condition: "വലിയ അളവിലുള്ള കരുത്തുറ്റ പല്ലുകൾ (വലിയ അസ്ഥികൾ കടിച്ചു പൊട്ടിക്കും).",
    bite_record: "കടി റെക്കോർഡ്: 4 പേർ (എല്ലാവരും രാത്രി വഞ്ചിക്കാൻ നോക്കിയവർ).",
    isHired: false,
    photo: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&q=80",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1291Hto_f66EfSbSk6-Y3klS-wEb1INSo-9ZNgT1xw&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSunQUgF-kY3kBWrxxtLCKv2p6-vJEAwLN79L_sDAJAbQ&s=10",
    work_experience: [
      {
        title: "ഹെവി സെക്യൂരിറ്റി കമാൻഡർ",
        org: "പാലം വിജിലൻസ് ഗ്രൂപ്പ് (2018 – നിലവിൽ)",
        details: ["പാലത്തിലൂടെ പോകുന്ന ഭാരമേറിയ ലോറികൾക്ക് നേരെ കുരയ്ക്കൽ.", "രാത്രിയിൽ തോടിൻ കരയിലെ സംശയാസ്പദ നീക്കങ്ങൾ തടയൽ."]
      }
    ],
    skills: [
      "ഭയമില്ലാത്ത നേരിട്ടുള്ള ഗർജ്ജനം",
      "ഒരു കൂട്ടം പട്ടികളെ ഒറ്റയ്ക്ക് നയിക്കാനുള്ള കഴിവ്",
      "ഇരുട്ടിൽ ഒളിച്ചിരുന്ന് ആക്രമിക്കൽ"
    ],
    reviews: []
  },
  {
    id: "dog_6",
    name: "ചാർലി സുരേഷ്",
    role: "ചീഫ് സ്കൂട്ടർ ചേസിംഗ് ഓഫീസർ",
    territory: "റെയിൽവേ സ്റ്റേഷൻ റോഡ്",
    tag: "മഞ്ഞ വി ടാഗ്",
    teeth_count: 28,
    teeth_condition: "സ്കൂട്ടറിന്റെ ടയറിൽ മാത്രം മുട്ടിക്കാൻ രൂപകൽപ്പന ചെയ്ത പല്ലുകൾ.",
    bite_record: "ഇതുവരെ കടിച്ചിട്ടില്ല, ഫുട്ബോൾ പോലെ പിന്തുടരൽ മാത്രം.",
    isHired: false,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjHDXhbsrTzGw-TVkvbXCT3kvNGNTlMPSImMf9PA5Ocw&s=10",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCadqVPZ-Hu8FjH-903WXH9IMwlbKZ2OlLNxgNoY8Wpw&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl1I1q0Lt9prN7VOcBcEphh6HaB7kyMgYSQVLhxjoLYg&s=10",
    work_experience: [
      {
        title: "സ്പീഡ് ചേസിംഗ് സ്പെഷ്യലിസ്റ്റ്",
        org: "സ്റ്റേഷൻ റോഡ് സ്പെഷ്യൽ സ്ക്വാഡ് (2020 – നിലവിൽ)",
        details: ["40 km/h-ൽ കൂടുതൽ വേഗതയുള്ള വണ്ടികൾ പിന്തുടരൽ.", "ഓട്ടോക്കാരുമായി അടുത്ത ബന്ധം കാത്തുസൂക്ഷിക്കൽ."]
      }
    ],
    skills: [
      "വളവുകളിൽ പെട്ടെന്ന് തിരിയാനുള്ള കഴിവും ഗ്രിപ്പും",
      "സൈലൻസറിന്റെ പുക തട്ടാതെ ഓടൽ",
      "വണ്ടി നിർത്തുമ്പോൾ തിരിഞ്ഞു നടക്കൽ"
    ],
    reviews: []
  },
  {
    id: "dog_7",
    name: "റോക്കി കുമാരൻ",
    role: "സീനിയർ നൈറ്റ് വിജിലൻസ് ഓഫീസർ",
    territory: "ടെമ്പിൾ റോഡ് ജംഗ്ഷൻ",
    tag: "വലതു ചെവി എബിസി സിംബൽ",
    teeth_count: 30,
    teeth_condition: "കൂർത്ത വശങ്ങളുള്ള നല്ല വെള്ള പല്ലുകൾ.",
    bite_record: "ഇതുവരെ കടിച്ചത്: 1 മോഷണ ശ്രമം നടത്തിയ ആളെ.",
    isHired: false,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyix1ilOOCuWnGy4-fnsnApv2To95iLB2UMUEgg3jBxw&s=10",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAKi_PoRZt6A7AUr3Hayz9kPbFNPCRZi8xpjdk4i7qw&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsXFVbACYoAH36y7_VInISrxOE9J5_RgQTg6tNwH0PcA&s=10",
    work_experience: [
      {
        title: "ക്ഷേത്ര പരിസര സുരക്ഷാ കാവൽക്കാരൻ",
        org: "ടെമ്പിൾ നൈറ്റ് വാച്ച് (2019 – നിലവിൽ)",
        details: ["ഉത്സവ പറമ്പിലെ മാലിന്യങ്ങൾ കാത്തുസൂക്ഷിക്കൽ.", "അന്യദേശ പട്ടികളെ തുരത്തൽ."]
      }
    ],
    skills: [
      "ശബ്ദമില്ലാതെ നടന്ന് സുരക്ഷ ഉറപ്പാക്കൽ",
      "നിഴലുകൾ നിരീക്ഷിച്ച് തിരിച്ചറിയൽ",
      "കൂട്ടത്തോടെയുള്ള കുരയ്ക്ക് നേതൃത്വം നൽകൽ"
    ],
    reviews: []
  },
  {
    id: "dog_8",
    name: "മണിമുത്തു",
    role: "അസിസ്റ്റന്റ് സദ്യ ഇൻസ്‌പെക്ടർ",
    territory: "കല്യാണ മണ്ഡപം റോഡ്",
    tag: "ഇടതു ചെവി നോച്ച്",
    teeth_count: 24,
    teeth_condition: "സദ്യ ഇലകൾ വൃത്തിയാക്കാൻ അനുയോജ്യമായ ചെറിയ പല്ലുകൾ.",
    bite_record: "ആരെയും കടിക്കാറില്ല, തികച്ചും സമാധാനപ്രിയൻ.",
    isHired: false,
    photo: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=600&q=80",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbX2jmZ2RDesorYMS3pPaHSp43kpFwYBNzmLFnWuVhw&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY_w71bRnc_PWDHDGPFBVBpTjLrmoXt7Lo6FjnDIqg9A&s",
    work_experience: [
      {
        title: "സദ്യ ഇല പരിശോധകൻ",
        org: "ഓഡിറ്റോറിയം വേസ്റ്റ് യൂണിറ്റ് (2021 – നിലവിൽ)",
        details: ["പായസവും ചിക്കൻ എല്ലുകളും വേർതിരിച്ചെടുക്കൽ.", "പൂച്ചകൾ പാത്രത്തിൽ തൊടാതെ കാക്കൽ."]
      }
    ],
    skills: [
      "അസ്ഥികൾ നിമിഷനേരം കൊണ്ട് കടിച്ചു തിന്നൽ",
      "കല്യാണ ജനക്കൂട്ടത്തിനിടയിലൂടെ തടസ്സമില്ലാതെ നടക്കൽ",
      "പാചകക്കാരുമായി നല്ല സൗഹൃദം സ്ഥാപിച്ച് ഭക്ഷണം വാങ്ങൽ"
    ],
    reviews: []
  },
  {
    id: "dog_9",
    name: "സിംബ വിജയൻ",
    role: "ചീഫ് വിരട്ടൽ എക്സിക്യൂട്ടീവ്",
    territory: "കെഎസ്ആർടിസി ബസ് സ്റ്റാൻഡ് പിൻവശം",
    tag: "കഴുത്തിൽ ചുവന്ന റിബൺ ടാഗ്",
    teeth_count: 28,
    teeth_condition: "വലിയ കുരയ്ക്കൊപ്പം പ്രദർശിപ്പിക്കുന്ന ഭയപ്പെടുത്തുന്ന പല്ലുകൾ.",
    bite_record: "ഇതുവരെ കടിച്ചത്: 2 ബസ്സ് ഹെൽപ്പർമാരെ (രാത്രി ഭയപ്പെടുത്തിയപ്പോൾ).",
    isHired: false,
    photo: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGJep-hYOYiKN83wElDF0JFnwad77GObr0zUQNExI7tg&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqzHDWCE7KUf_7B8-ismrZiaKpQwuHkR_q-qYEGGrcDg&s=10",
    work_experience: [
      {
        title: "സ്റ്റാൻഡ് വിജിലൻസ് ഹെഡ്",
        org: "കെഎസ്ആർടിസി പാതിരാ സ്ക്വാഡ് (2020 – നിലവിൽ)",
        details: ["രാത്രി വണ്ടികളുടെ ലൈറ്റ് വെളിച്ചത്തിൽ ഗർജ്ജിക്കൽ.", "യാത്രക്കാരുടെ ലഗേജുകൾക്ക് സമാന്തര കാവൽ."]
      }
    ],
    skills: [
      "ഉയർന്ന ശബ്ദത്തിൽ തുടർച്ചയായി കുരയ്ക്കൽ",
      "ഡീസൽ പുക സഹിച്ച് നിൽക്കാനുള്ള ശേഷി",
      "അപരിചിതരെ ഒരു കിലോമീറ്റർ അകലെ നിന്ന് തിരിച്ചറിയൽ"
    ],
    reviews: []
  },
  {
    id: "dog_10",
    name: "ടൈഗർ ദിനേശൻ",
    role: "സീനിയർ നൈറ്റ് വിജിലൻസ് ഓഫീസർ",
    territory: "പോസ്റ്റ് ഓഫീസ് കവല",
    tag: "വലതു ചെവി എബിസി വെരിഫൈഡ്",
    teeth_count: 30,
    teeth_condition: "ഉറപ്പുള്ളതും യാതൊരു കേടുപാടുകളും ഇല്ലാത്തതുമായ പല്ലുകൾ.",
    bite_record: "കടിച്ചത്: 3 പേർ (രാത്രി കവലയിൽ ലഹരി ഉപയോഗിക്കാൻ നോക്കിയവർ).",
    isHired: false,
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkAwucqgRYyOTWl7v85YecPaBrZnBSRaPrXeEDzA8Teg&s",
    teeth_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIru1hTNeu2jPs-ynCArCntULG0YQ_TopytnI7gj_1Gw&s=10",
    nails_photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPE5zTJ00WHAm0-nmc2sMDQSAx8c2066OKnJR6DM9dgQ&s=10",
    work_experience: [
      {
        title: "ടൗൺ നൈറ്റ് കമാൻഡർ",
        org: "പോസ്റ്റ് ഓഫീസ് പട്രോൾ (2019 – നിലവിൽ)",
        details: ["പോസ്റ്റ് ഓഫീസിന് ചുറ്റും രാത്രി 12 മുതൽ രാവിലെ 5 വരെ തുടർച്ചയായ കാവൽ.", "കവല കടന്നുപോകുന്ന കാറുകൾക്ക് പിന്നാലെ ഓടൽ."]
      }
    ],
    skills: [
      "രാത്രിയിലെ ചെറിയ ചലനങ്ങൾ പോലും കണ്ടെത്തൽ",
      "കട്ട അണച്ച് കിടന്ന് പെട്ടെന്ന് ചാടിവീഴൽ",
      "മഴയത്തും തടസ്സമില്ലാതെ ഡ്യൂട്ടി ചെയ്യൽ"
    ],
    reviews: []
  }
];

// Local Storage Handlers
function getStoredProfiles() {
  const data = localStorage.getItem('patti_profiles_v5');
  if (!data) {
    localStorage.setItem('patti_profiles_v5', JSON.stringify(defaultProfiles));
    return defaultProfiles;
  }
  return JSON.parse(data);
}

function saveStoredProfiles(profiles) {
  localStorage.setItem('patti_profiles_v5', JSON.stringify(profiles));
  updateHiredBadgeCount();
}

function getHiredMissions() {
  const data = localStorage.getItem('patti_hired_missions_v5');
  return data ? JSON.parse(data) : [];
}

function saveHiredMissions(missions) {
  localStorage.setItem('patti_hired_missions_v5', JSON.stringify(missions));
  updateHiredBadgeCount();
}

function updateHiredBadgeCount() {
  const missions = getHiredMissions();
  const countSpan = document.getElementById('hiredBadgeCount');
  if (countSpan) countSpan.innerText = missions.length;
}

function refreshProfileOrder() {
  playBarkSound(700, 0.1);
  const profiles = getStoredProfiles();
  for (let i = profiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [profiles[i], profiles[j]] = [profiles[j], profiles[i]];
  }
  renderProfilesList(profiles);
}

function renderProfiles() {
  const profiles = getStoredProfiles();
  renderProfilesList(profiles);
  updateHiredBadgeCount();
}

function renderProfilesList(profiles) {
  const roleFilterElem = document.getElementById('roleFilter');
  const roleFilter = roleFilterElem ? roleFilterElem.value : 'ALL';
  const grid = document.getElementById('profilesGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = profiles.filter(p => {
    if (roleFilter === 'ALL') return true;
    return p.role === roleFilter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center py-10 text-slate-500 font-bold">ഈ കാറ്റഗറിയിൽ പ്രൊഫൈലുകളൊന്നും കണ്ടെത്താനായില്ല 🐕</div>`;
    return;
  }

  filtered.forEach(dog => {
    const card = document.createElement('div');
    card.className = "bg-slate-800/90 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-5 shadow-xl transition-all relative flex flex-col justify-between";
    
    const availabilityBadge = dog.isHired 
      ? `<span class="bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">🔴 ദൗത്യത്തിലാണ് (Not Available)</span>`
      : `<span class="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">🟢 അവൈലബിൾ (Available)</span>`;

    const currentRating = calculateDogRating(dog);

    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <div class="flex items-center gap-3">
            <img src="${dog.photo}" alt="${dog.name}" class="w-14 h-14 rounded-full object-contain bg-slate-950 border-2 border-amber-500 shadow-md" />
            <div>
              <h3 class="text-base font-bold text-white leading-snug">${dog.name}</h3>
              <p class="text-xs text-amber-400 font-bold">${dog.role}</p>
              <div class="flex items-center gap-1 text-[11px] text-amber-300 mt-0.5">
                <span>⭐ ${currentRating}</span>
                <span class="text-slate-500">(${dog.reviews ? dog.reviews.length : 0} റിവ്യൂകൾ)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-3">${availabilityBadge}</div>

        <p class="text-xs text-slate-400 mb-2 flex items-center gap-1">📍 പ്രദേശം: ${dog.territory}</p>
        <p class="text-[11px] text-slate-400 mb-3 bg-slate-950/40 p-2 rounded-lg border border-slate-800">🏷️ മുദ്ര: ${dog.tag}</p>

        <div class="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 mb-4">
          <div><span class="text-slate-500">പല്ലുകൾ:</span> <strong class="text-amber-400">${dog.teeth_count} എണ്ണം</strong></div>
          <div><span class="text-slate-500">കടി പ്രൊഫൈൽ:</span> <strong class="text-slate-200">സജീവ എക്സിക്യൂട്ടീവ്</strong></div>
        </div>
      </div>

      <button onclick="openCvModal('${dog.id}')" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-lg">
        📄 ക്ലിക്കുചെയ്ത് CV കാണുക
      </button>
    `;
    grid.appendChild(card);
  });
}

// Helper function to convert numeric rating into star icons
function renderStars(rating) {
  const numericRating = Math.round(Number(rating) || 0);
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= numericRating) {
      starsHtml += '<span class="text-amber-400">★</span>';
    } else {
      starsHtml += '<span class="text-slate-600">☆</span>';
    }
  }
  return `<span class="inline-flex gap-0.5 text-base">${starsHtml}</span>`;
}

// Open Full Dog CV Modal
function openCvModal(dogId) {
  const profiles = getStoredProfiles();
  const dog = profiles.find(p => p.id === dogId);
  if (!dog) return;

  playBarkSound(800, 0.15);
  const modalContent = document.getElementById('cvModalContent');

  const hireBtnHtml = dog.isHired
    ? `<button disabled class="w-full bg-slate-700 text-slate-400 font-bold py-3 rounded-xl text-xs cursor-not-allowed">
        ❌ നിലവിൽ ദൗത്യത്തിലാണ് (Unavailable)
       </button>`
    : `<button onclick="openHireModal('${dog.id}')" class="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-xl text-xs shadow-lg transition-all">
        🎯 ഡോഗ് എക്സിക്യൂട്ടീവിനെ നിയമിക്കുക (Hire Dog)
       </button>`;

  // Work Exp List HTML
  const expHtml = dog.work_experience && dog.work_experience.length > 0 
    ? dog.work_experience.map(exp => `
        <div class="mb-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <h5 class="text-xs font-bold text-slate-200">📌 ${exp.title}</h5>
          <p class="text-[11px] text-amber-400 mb-1.5">* ${exp.org}</p>
          <ul class="list-disc list-inside text-[11px] text-slate-300 space-y-0.5">
            ${exp.details ? exp.details.map(d => `<li>${d}</li>`).join('') : ''}
          </ul>
        </div>
      `).join('')
    : `<p class="text-xs text-slate-500">തൊഴിൽ പരിചയം രേഖപ്പെടുത്തിയിട്ടില്ല.</p>`;

  // Key Skills List HTML
  const skillsHtml = dog.skills && dog.skills.length > 0
    ? `<ul class="list-disc list-inside text-xs text-slate-200 space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
        ${dog.skills.map(s => `<li>${s}</li>`).join('')}
       </ul>`
    : `<p class="text-xs text-slate-500">പ്രത്യേക കഴിവുകൾ രേഖപ്പെടുത്തിയിട്ടില്ല.</p>`;

  // User Reviews List HTML
  const reviewsHtml = dog.reviews && dog.reviews.length > 0
    ? dog.reviews.map(r => `
        <blockquote class="text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 italic mb-2">
          <div class="flex items-center justify-between mb-1 not-italic">
            <span class="font-bold text-amber-400">${r.reviewerName}</span>
            <div>${renderStars(r.rating || 5)}</div>
          </div>
          "${r.comment}"
        </blockquote>
      `).join('')
    : `<p class="text-xs text-slate-500 italic bg-slate-950 p-3 rounded-xl border border-slate-800">ഇതുവരെ ഉപയോക്താക്കൾ റിവ്യൂകൾ ഒന്നും നൽകിയിട്ടില്ല. ദൗത്യം പൂർത്തിയാക്കിയ ശേഷം ഉപയോക്താവിന് റിവ്യൂ നൽകാവുന്നതാണ്.</p>`;

  // Calculate overall rating or fallback to average/default
  const currentRating = typeof calculateDogRating === 'function' ? calculateDogRating(dog) : (dog.rating || 5);

  if (modalContent) {
    modalContent.innerHTML = `
      <!-- Resume Header -->
      <div class="text-center pb-4 border-b border-slate-800">
        <img src="${dog.photo}" alt="${dog.name}" class="w-24 h-24 rounded-full object-contain bg-slate-950 mx-auto mb-3 border-4 border-amber-500 shadow-xl" />
        <div class="flex items-center justify-center gap-1.5 mb-2">
          ${renderStars(currentRating)}
          <span class="text-amber-400 font-bold text-xs">(${currentRating})</span>
        </div>
        <div class="space-y-1 mt-2 text-xs">
          <p class="text-slate-300"><strong class="text-amber-400">പേര്:</strong> ${dog.name}</p>
          <p class="text-slate-300"><strong class="text-amber-400">തസ്തിക:</strong> ${dog.role}</p>
          <p class="text-slate-300"><strong class="text-amber-400">പ്രദേശം (Territory):</strong> ${dog.territory}</p>
          <p class="text-slate-300"><strong class="text-amber-400">പ്രത്യേക മുദ്ര:</strong> ${dog.tag}</p>
        </div>
      </div>

      <!-- 1. Bite Specs, Teeth & Nails Verification -->
      <div class="py-4 border-b border-slate-800">
        <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">1. കടിക്കാനുള്ള ശേഷിയും പല്ല് വിവരവും (Bite Specs & Teeth Verification)</h4>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div class="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <img src="${dog.teeth_photo}" alt="Teeth Spec" class="w-14 h-14 rounded-lg object-contain bg-slate-950 border border-slate-700" />
            <div class="text-xs">
              <span class="text-slate-400 font-semibold block">പല്ലുകളുടെ ക്വാളിറ്റി</span>
              <p class="text-slate-300">ആകെ പല്ലുകൾ: <strong class="text-amber-400">${dog.teeth_count} എണ്ണം</strong></p>
            </div>
          </div>
          <div class="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <img src="${dog.nails_photo || dog.photo}" alt="Nails Spec" class="w-14 h-14 rounded-lg object-contain bg-slate-950 border border-slate-700" />
            <div class="text-xs">
              <span class="text-slate-400 font-semibold block">നഖങ്ങളുടെ ക്വാളിറ്റി</span>
              <p class="text-slate-300">ഗ്രിപ്പ്: <strong class="text-amber-400">കൂർത്ത സ്ട്രീറ്റ് ഗ്രിപ്പ് 🐾</strong></p>
            </div>
          </div>
        </div>

        <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
          <p class="text-slate-300"><strong class="text-slate-200">പല്ലിന്റെ കണ്ടീഷൻ:</strong> ${dog.teeth_condition}</p>
          <p class="text-slate-300"><strong class="text-slate-200">കടി പ്രൊഫൈൽ (Bite Record):</strong> ${dog.bite_record}</p>
        </div>
      </div>

      <!-- 2. Work Experience -->
      <div class="py-4 border-b border-slate-800">
        <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">2. ജോലി പരിചയം (Work Experience)</h4>
        ${expHtml}
      </div>

      <!-- 3. Key Skills -->
      <div class="py-4 border-b border-slate-800">
        <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">3. പ്രധാന കഴിവുകൾ (Key Skills)</h4>
        ${skillsHtml}
      </div>

      <!-- 4. Recommendations & User Reviews -->
      <div class="py-4 border-b border-slate-800">
        <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">4. ഉപയോക്താക്കളുടെ ശുപാർശകൾ (Endorsements & User Reviews)</h4>
        ${reviewsHtml}
      </div>

      <div class="mt-5 flex flex-col sm:flex-row gap-3">
        <div class="flex-1">${hireBtnHtml}</div>
        <button onclick="closeCvModal()" class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-5 py-3 rounded-xl text-xs">
          അടയ്ക്കുക
        </button>
      </div>
    `;
  }
  
  const cvModal = document.getElementById('cvModal');
  if (cvModal) cvModal.classList.remove('hidden');
}

function closeCvModal() {
  const cvModal = document.getElementById('cvModal');
  if (cvModal) cvModal.classList.add('hidden');
}

// Hire Modal Controls
function openHireModal(dogId) {
  const profiles = getStoredProfiles();
  const dog = profiles.find(p => p.id === dogId);
  if (!dog || dog.isHired) return;

  closeCvModal();
  
  const hireDogId = document.getElementById('hireDogId');
  const hireDogTitle = document.getElementById('hireDogTitle');
  const hireForm = document.getElementById('hireForm');
  const hireModal = document.getElementById('hireModal');

  if (hireDogId) hireDogId.value = dog.id;
  if (hireDogTitle) hireDogTitle.innerText = `${dog.name}-നെ ദൗത്യത്തിന് ഏൽപ്പിക്കുക`;
  if (hireForm) hireForm.reset();
  if (hireModal) hireModal.classList.remove('hidden');
}

function closeHireModal() {
  const hireModal = document.getElementById('hireModal');
  if (hireModal) hireModal.classList.add('hidden');
}

function handleHireSubmit(event) {
  event.preventDefault();
  playBarkSound(900, 0.25);
  
  const dogIdElem = document.getElementById('hireDogId');
  if (!dogIdElem) return;

  const dogId = dogIdElem.value;
  const profiles = getStoredProfiles();
  const dog = profiles.find(p => p.id === dogId);

  if (!dog) return;

  dog.isHired = true;
  saveStoredProfiles(profiles);

  const mission = {
    id: 'mission_' + Date.now(),
    dogId: dog.id,
    dogName: dog.name,
    target: document.getElementById('hireTarget')?.value || '',
    task: document.getElementById('hireTask')?.value || '',
    location: document.getElementById('hireLocation')?.value || '',
    type: document.getElementById('hireType')?.value || '',
    reward: document.getElementById('hireReward')?.value || '',
    date: new Date().toLocaleDateString('ml-IN')
  };

  const missions = getHiredMissions();
  missions.unshift(mission);
  saveHiredMissions(missions);

  closeHireModal();
  renderProfiles();
  alert(`✅ ദൗത്യ കരാർ പൂർത്തിയായി!\n\n${dog.name} ദൗത്യം ഏറ്റെടുത്തു. ഡോഗ് ഇപ്പോൾ "Not Available" അവസ്ഥയിലാണ്.`);
}

// Sidebar Hired Tracker Modal
function openHiredTrackerModal() {
  playBarkSound(700, 0.1);
  const missions = getHiredMissions();
  const container = document.getElementById('hiredListContent');
  if (!container) return;

  container.innerHTML = '';

  if (missions.length === 0) {
    container.innerHTML = `<div class="text-center py-8 text-slate-500 font-bold text-xs">നിങ്ങൾ ഇതുവരെ പട്ടികളെയൊന്നും ദൗത്യത്തിന് നിയമിച്ചിട്ടില്ല 🐕</div>`;
  } else {
    missions.forEach(m => {
      const card = document.createElement('div');
      card.className = "bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs";
      card.innerHTML = `
        <div class="flex justify-between items-center border-b border-slate-800 pb-2">
          <h4 class="font-bold text-amber-400 text-sm">${m.dogName}</h4>
          <span class="text-[10px] text-slate-500">${m.date}</span>
        </div>
        <p class="text-slate-300">🎯 <strong class="text-slate-200">ലക്ഷ്യം:</strong> ${m.target}</p>
        <p class="text-slate-300">📌 <strong class="text-slate-200">ജോലി:</strong> ${m.task}</p>
        <p class="text-slate-300">📍 <strong class="text-slate-200">സ്ഥലം:</strong> ${m.location}</p>
        <p class="text-slate-300">🎁 <strong class="text-amber-400">പ്രതിഫലം:</strong> ${m.reward}</p>
        <button onclick="openReviewModal('${m.id}', '${m.dogId}', '${m.dogName}')" class="w-full mt-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold py-2 rounded-lg text-xs transition-all border border-emerald-500/30">
          ✅ ജോലി പൂർത്തിയായി & റിവ്യൂ നൽകുക (Complete & Give Review)
        </button>
      `;
      container.appendChild(card);
    });
  }

  const trackerModal = document.getElementById('hiredTrackerModal');
  if (trackerModal) trackerModal.classList.remove('hidden');
}

function closeHiredTrackerModal() {
  const trackerModal = document.getElementById('hiredTrackerModal');
  if (trackerModal) trackerModal.classList.add('hidden');
}

// Review Modal Logic (After Work Done)
function openReviewModal(missionId, dogId, dogName) {
  closeHiredTrackerModal();
  
  const reviewMissionId = document.getElementById('reviewMissionId');
  const reviewDogId = document.getElementById('reviewDogId');
  const reviewDogName = document.getElementById('reviewDogName');
  const reviewForm = document.getElementById('reviewForm');
  const reviewModal = document.getElementById('reviewModal');

  if (reviewMissionId) reviewMissionId.value = missionId;
  if (reviewDogId) reviewDogId.value = dogId;
  if (reviewDogName) reviewDogName.innerText = `ഡോഗ്: ${dogName}`;
  if (reviewForm) reviewForm.reset();
  if (reviewModal) reviewModal.classList.remove('hidden');
}

function closeReviewModal() {
  const reviewModal = document.getElementById('reviewModal');
  if (reviewModal) reviewModal.classList.add('hidden');
}

function handleReviewSubmit(event) {
  event.preventDefault();
  playBarkSound(900, 0.2);

  const missionId = document.getElementById('reviewMissionId')?.value;
  const dogId = document.getElementById('reviewDogId')?.value;
  const reviewerName = document.getElementById('reviewerName')?.value || 'Anonymous';
  const comment = document.getElementById('reviewComment')?.value || '';
  
  // Extract star rating input if present, defaulting to 5
  const ratingInput = document.getElementById('reviewRating');
  const rating = ratingInput ? parseFloat(ratingInput.value) : 5;

  // 1. Remove mission
  let missions = getHiredMissions();
  missions = missions.filter(m => m.id !== missionId);
  saveHiredMissions(missions);

  // 2. Append review to dog's profile and set available
  const profiles = getStoredProfiles();
  const dog = profiles.find(p => p.id === dogId);
  if (dog) {
    dog.isHired = false;
    if (!dog.reviews) dog.reviews = [];
    dog.reviews.push({ reviewerName, comment, rating });
    saveStoredProfiles(profiles);
  }

  closeReviewModal();
  renderProfiles();
  alert("🎉 ജോലി വിജയിച്ചതായി രേഖപ്പെടുത്തി, ഉപയോക്താവിന്റെ റിവ്യൂ പട്ടി CV-യിൽ ചേർത്തു!");
}

// Add Dog Profile Form Controls
function openRegisterModal() {
  const dogForm = document.getElementById('dogForm');
  const registerModal = document.getElementById('registerModal');
  if (dogForm) dogForm.reset();
  if (registerModal) registerModal.classList.remove('hidden');
}

function closeRegisterModal() {
  const registerModal = document.getElementById('registerModal');
  if (registerModal) registerModal.classList.add('hidden');
}

function handleFormSubmit(event) {
  event.preventDefault();
  const profiles = getStoredProfiles();

  const expInput = document.getElementById('formExperience')?.value || '';
  const skillsInput = document.getElementById('formSkills')?.value || '';

  const newDog = {
    id: 'dog_' + Date.now(),
    name: document.getElementById('formName')?.value || '',
    role: document.getElementById('formRole')?.value || '',
    territory: document.getElementById('formTerritory')?.value || '',
    tag: document.getElementById('formTag')?.value || '',
    teeth_count: parseInt(document.getElementById('formTeethCount')?.value) || 28,
    teeth_condition: document.getElementById('formTeethCondition')?.value || "നല്ല ഒന്നാന്തരം കൂർത്ത പല്ലുകൾ.",
    bite_record: document.getElementById('formBiteRecord')?.value || "ആവശ്യഘട്ടങ്ങളിൽ മാത്രം പ്രയോഗിക്കുന്നു.",
    isHired: false,
    photo: document.getElementById('formPhoto')?.value || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    teeth_photo: document.getElementById('formTeethPhoto')?.value || "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80",
    nails_photo: document.getElementById('formNailsPhoto')?.value || "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80",
    work_experience: [
      {
        title: "ഫ്രീലാന്സ് സ്ട്രീറ്റ് എക്സിക്യൂട്ടീവ്",
        org: document.getElementById('formTerritory')?.value || '',
        details: expInput ? expInput.split(',').map(s => s.trim()) : ["കവല കാവൽ ജോലികൾ സജീവം."]
      }
    ],
    skills: skillsInput ? skillsInput.split(',').map(s => s.trim()) : ["ദ്രുതഗതിയിലുള്ള പ്രതികരണം"],
    reviews: []
  };

  profiles.unshift(newDog);
  saveStoredProfiles(profiles);
  playBarkSound(800, 0.2);
  closeRegisterModal();
  renderProfiles();
}

window.addEventListener('DOMContentLoaded', () => {
  renderProfiles();
});