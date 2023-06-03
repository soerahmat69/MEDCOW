const gejala = [];
const penyakit = [];
const bobot = [];
const bobot_gejala = [];
const solusi = [];
let input_penyakit = document.getElementById("input_penyakit");
let button_submit = document.getElementById("done");
let load_gejala = document.getElementById("load_gejala");
let load_pilihan = document.getElementById("load_pilihan");
let load_mencocokan = document.getElementById("load_mencocokan");
let button_penyocokan = document.getElementById("penyocokan");
let validation = document.getElementById("validation");
let close_validation = document.getElementById("close_validation");
let close_penyocokan_kedua = document.getElementById("close_penyocokan_kedua");
let gejala_result = document.getElementById("gejala_result");
let penyakit_result = document.getElementById("penyakit_result");
let tingkat_result = document.getElementById("tingkat_result");
let solusi_result = document.getElementById("solusi_result");
let pilihan_gejala = [];
let data_lost = [];
let data_akhir = [];
let gejala_res = [];
let penyakit_res = [];
let tingkat_res = [];
let soulusi_res = [];

fetch("Gejala.json")
  .then((response) => response.json())
  .then((data) => {
    gejala.push(data[0].gejala);
  });

fetch("penyakit.json")
  .then((response) => response.json())
  .then((data) => {
    penyakit.push(data[0].penyakit);
  });

fetch("daftar_bobot_pengetahuan.json")
  .then((response) => response.json())
  .then((data) => {
    bobot_gejala.push(data[0].daftar_bobot_pengetahuan_pakar);
  });

fetch("bobot_gejala.json")
  .then((response) => response.json())
  .then((data) => {
    bobot.push(data[0].level_gejala);
  });

fetch("solusi.json")
  .then((response) => response.json())
  .then((data) => {
    solusi.push(data[0].solusi);
  });

const modal_penyocokan = (valid) => {
  if (valid == true) {
    document.getElementById("penyocokan_kedua").classList.remove("hidden");
  } else {
    document.getElementById("penyocokan_kedua").classList.add("hidden");
  }
};

close_validation.addEventListener("click", () => validations("", false));
close_penyocokan_kedua.addEventListener("click", () => modal_penyocokan(false));

setInterval(() => {
  let text = document.getElementById("text-int");
  text.innerText = "Medkit ternak";
  setTimeout(() => {
    let text = document.getElementById("text-int");
    text.innerText = "Medkit cow";
  }, 6000);
}, 9000);

const pilih_gejala = (kode, kode2) => {
  if ((!pilihan_gejala.includes(kode) && kode !== 0) || null) {
    pilihan_gejala.push(kode);
    console.log(kode);
    pilih();
  }
  // if(!data_akhir.includes(kode2) && kode2 !== 0){
  //   data_akhir.push(kode2)
  //   console.log(kode2+"ke2")
  // }
};
const hapus_gejala = (kode) => {
  pilihan_gejala = pilihan_gejala.filter((kodes) => kodes !== kode);
  let elements = document.getElementsByName(kode);
  if (elements.length !== 0) {
    elements.forEach((element) => {
      element.classList.add("hidden");
    });
  }
};

function search(query) {
  let results = [];

  gejala[0].filter((gejala) => {
    results.push(gejala.gejala.toLowerCase().startsWith(query.toLowerCase()));
  });

  return results;
}

function validations(val, bool) {
  if (bool) {
    validation.classList.remove("hidden");
    document.getElementById("warn_validation").innerText = val;
  } else {
    validation.classList.add("hidden");
  }
}

function showResults(results) {
  for (let index = 0; index < results.length; index++) {
    if (results[index] !== true) {
      let id = document.getElementById(gejala[0][index].kode);
      id.classList.add("hidden");
    } else {
      let id = document.getElementById(gejala[0][index].kode);
      id.classList.remove("hidden");
    }
  }
}
document.getElementById("searchInput").addEventListener("input", function (e) {
  let query = e.target.value;
  let searchResults = search(query);
  // console.log(searchResults)
  showResults(searchResults);
});

setTimeout(() => {
  gejala[0].map((res) => {
    const newEl = document.createElement("button");
    newEl.classList.add("ring-1", "ring-black", "px-2", "px-3", "rounded-md");
    newEl.innerHTML = res.gejala;
    newEl.id = res.kode;
    newEl.addEventListener("click", () => pilih_gejala(res.kode, 0));
    load_gejala.appendChild(newEl);
  });
}, 1000);

const pilih = () => {
  pilihan_gejala.map((res) => {
    gejala[0].filter((rest) => {
      if (
        res === rest.kode &&
        document.getElementsByName(rest.kode).length == 0
      ) {
        const newEl = document.createElement("button");
        newEl.classList.add(
          "ring-1",
          "ring-black",
          "px-2",
          "px-3",
          "rounded-md"
        );
        newEl.innerHTML = rest.gejala;
        newEl.name = rest.kode;
        newEl.value = rest.kode;
        newEl.addEventListener("click", () => hapus_gejala(rest.kode));
        load_pilihan.appendChild(newEl);
        console.log("aaaa" + document.getElementsByName(rest.kode).values());
        console.log("adas");
      }
    });
  });
};

const res_penyakit = () => {
  pilihan_gejala.filter((res) => {
    console.log();
  });
};

const penyocokan_first = () => {
  let maxJumlahGejala = 3;
  let penyakitTerbanyak = [];

  penyakit[0].map((penyakit) => {
    // let bobot_rate=[]
    const gejala_kode = penyakit.Gejala;
    const jumlahGejala = gejala_kode.filter((item) =>
      pilihan_gejala.includes(item)
    ).length;

    if (jumlahGejala === maxJumlahGejala) {
      // console.log(penyakit.Gejala+"sameee");
      // penyakitTerbanyak.push(penyakit.Gejala);
      // // console.log(penyakit.Gejala.join(","))
      // gejala[0].filter((res) => {
      //   if (penyakit.Gejala.includes(res.kode)) {
      //     //  console.log(res.gejala)
      //     gejala_res.push(res.gejala);
      //   }
      // });
      // penyakit_res.push(penyakit.nama_penyakit);
      // bobot_gejala[0].filter((res) => {
      //   if (penyakit.Gejala.includes(res.Kode_Gejala)) {
      //     tingkat_res.push(res.Bobot);
      //     // console.log(res.Bobot);
      //   }
      // });
      // solusi[0].filter((res) => {
      //   if (penyakit.kode_penyakit.includes(res.Kode_Penyakit)) {
      //     penyakit_res.push(res.Nama_Penyakit);
      //     soulusi_res.push(res.Solusi);
      //   }
      // });
      // validations("Kami telah menemukan penyakit scroll kebawah ", true);
      // results(gejala_res, tingkat_res, penyakit_res, soulusi_res);
      preload()
    } else if (jumlahGejala >= 3) {
      maxJumlahGejala = jumlahGejala;
      penyakitTerbanyak = [penyakit.Gejala];
      console.log(penyakit.Gejala+"yhree");
      data_lost.push(penyakit);
      preload();
    } else if (jumlahGejala >= 2) {
      maxJumlahGejala = jumlahGejala;
      penyakitTerbanyak = [penyakit.Gejala];
      console.log(penyakit.Gejala+"ywoo");
      data_lost.push(penyakit);
      preload();
    }
  });
  if (data_lost.length===0) {
   
    validations("kami tidak menemukan penyakit dengan gejala yang cocok tambahkan beberapa gejala, mohon maaf lahir batin🤡", true);
  }
  return penyakitTerbanyak;
};

const preload = () => {
  // if (data_lost) {
    
  
  data_lost.map((res) => {
    let kecockan = gejala[0].filter((kode) => res.Gejala.includes(kode.kode));
    // let lost=pilihan_gejala.filter

    // console.log(res.Gejala)
    // console.log(kecockan)
    kecockan.map((nama_gejala) => {
      // console.log(pilihan_gejala.includes(nama_gejala.kode))
      if (!pilihan_gejala.includes(nama_gejala.kode)) {
        const newEl = document.createElement("button");
        newEl.classList.add(
          "ring-1",
          "ring-black",
          "px-2",
          "px-3",
          "rounded-md"
        );
        newEl.innerHTML = nama_gejala.gejala;
        // console.log(nama_gejala.gejala+"aa")
        newEl.addEventListener("click", () =>
          pilih_gejala(nama_gejala.kode, nama_gejala.kode)
        );
        load_mencocokan.appendChild(newEl);
      }
    });
    modal_penyocokan(true);
  });
// }else{
// }
};

function penyocokan_kedua() {
  let maxJumlahGejala = pilihan_gejala.length;
  let penyakitTerbanyak = [];
  let akurat = true

  penyakit[0].map((penyakit) => {
    // let bobot_rate=[]
    const gejala_kode = penyakit.Gejala;
    const jumlahGejala = gejala_kode.filter((item) =>
      pilihan_gejala.includes(item)
    ).length;

    if (jumlahGejala === maxJumlahGejala) {
      akurat=false
      penyakitTerbanyak.push(penyakit.Gejala);
      // console.log(penyakit.Gejala.join(","))
      gejala[0].filter((res) => {
        if (penyakit.Gejala.includes(res.kode)) {
          //  console.log(res.gejala)
          gejala_res.push(res.gejala);
        }
      });
      penyakit_res.push(penyakit.nama_penyakit);
      bobot_gejala[0].filter((res) => {
        if (penyakit.Gejala.includes(res.Kode_Gejala)) {
          tingkat_res.push(res.Bobot);
          console.log(res.Bobot);
        }
      });
      solusi[0].filter((res) => {
        if (penyakit.kode_penyakit.includes(res.Kode_Penyakit)) {
          penyakit_res.push(res.Nama_Penyakit);
          soulusi_res.push(res.Solusi);
        }
      });
    modal_penyocokan(false);
    scroll_down()
      validations("Kami telah menemukan penyakit scroll kebawah ", true);
      // results(penyakit.Gejala.join())
      results(gejala_res, tingkat_res, penyakit_res, soulusi_res);
    } else if (jumlahGejala >= 4 && akurat ==true) {
      akurat=false
      penyakitTerbanyak.push(penyakit.Gejala);
      // console.log(penyakit.Gejala.join(","))
      gejala[0].filter((res) => {
        if (penyakit.Gejala.includes(res.kode)) {
          //  console.log(res.gejala)
          gejala_res.push(res.gejala);
        }
      });
      penyakit_res.push(penyakit.nama_penyakit);
      bobot_gejala[0].filter((res) => {
        if (penyakit.Gejala.includes(res.Kode_Gejala)) {
          tingkat_res.push(res.Bobot);
          console.log(res.Bobot);
        }
      });
      solusi[0].filter((res) => {
        if (penyakit.kode_penyakit.includes(res.Kode_Penyakit)) {
          penyakit_res.push(res.Nama_Penyakit);
          soulusi_res.push(res.Solusi);
        }
      });
      
    modal_penyocokan(false);
    scroll_down()
      validations("Kami telah menemukan penyakit scroll kebawah ", true);
      // results(penyakit.Gejala.join())
      results(gejala_res, tingkat_res, penyakit_res, soulusi_res);

    } else if (jumlahGejala >= 3 && akurat ==true) {
      akurat=false
      penyakitTerbanyak.push(penyakit.Gejala);
      // console.log(penyakit.Gejala.join(","))
      gejala[0].filter((res) => {
        if (penyakit.Gejala.includes(res.kode)) {
          //  console.log(res.gejala)
          gejala_res.push(res.gejala);
        }
      });
      penyakit_res.push(penyakit.nama_penyakit);
      bobot_gejala[0].filter((res) => {
        if (penyakit.Gejala.includes(res.Kode_Gejala)) {
          tingkat_res.push(res.Bobot);
          console.log(res.Bobot);
        }
      });
      solusi[0].filter((res) => {
        if (penyakit.kode_penyakit.includes(res.Kode_Penyakit)) {
          penyakit_res.push(res.Nama_Penyakit);
          soulusi_res.push(res.Solusi);
        }
      });
      
    modal_penyocokan(false);
    scroll_down()
      validations("Kami telah menemukan penyakit scroll kebawah ", true);
      // results(penyakit.Gejala.join())
      results(gejala_res, tingkat_res, penyakit_res, soulusi_res);

    }
    // else{
    //   validations("kami tidak menemukan penyakit dengan gejala yang cocok, mohon maaf lahir batin🤡", true);
    // }
  });

  if(akurat==true)
  validations("kami tidak menemukan penyakit dengan gejala yang cocok tambahkan beberapa gejala, mohon maaf lahir batin🤡", true);

}

function results(list_gejala, list_tingkat, list_penyakit, list_solusi) {
  gejala_result.innerText = list_gejala.join(",");
  var counts = {};
  list_tingkat.forEach(function (num) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  });

  // Mendapatkan nilai terbanyak dan tingkat gejala yang sesuai
  var mostFrequentValue = Object.keys(counts).reduce(function (a, b) {
    return counts[a] > counts[b] ? a : b;
  });

  var tingkatGejala = bobot[0].find(function (obj) {
    return obj.Bobot === parseInt(mostFrequentValue);
  });
  console.log(tingkatGejala);
  tingkat_result.innerHTML = tingkatGejala.Tingkat_Gejala;
  penyakit_result.innerText = list_penyakit[0];
  list_solusi[0].map((res) => {
    let newEl = document.createElement("li");
    newEl.classList.add("list-disc");
    newEl.innerHTML = res;
    solusi_result.appendChild(newEl);
    console.log(res);
  });
}


function scroll_down(params) {
  const element = document.getElementsByTagName("body");
// Lakukan scroll ke bawah pada elemen tersebut
element.scrollTop = element.scrollHeight;
            
}

button_submit.addEventListener("click", () => {
  // console.log(pilihan_gejala)
  if (pilihan_gejala.length >= 3) {
    penyocokan_first();
  } else {
    validations(
      "Untuk melakukan kombinasi gejala harus membutuhkan 3 lebih gejala",
      true
    );
  }
});

button_penyocokan.addEventListener("click", () => penyocokan_kedua());
