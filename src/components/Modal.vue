<template>
    <div class="overlay">
      <div class="overlay" @click="onClose()"></div>
      <div class="modal">
        <div class="first-row">
          <img :src="country.flags.png" class="flag-icon" alt="">
          <div class="name">
            <div class="name-left">
              <p>Official Name: </p>
              <p>Common Name: </p>
              <p>Region: </p>
              <p>Sub Region: </p>
            </div>
            <div class="name-right">
              <h4>{{ country.name.official ?? "Null" }}</h4>
              <h4>{{ country.name.common ?? "Null" }}</h4>
              <h4>{{ country.region ?? "Null" }}</h4>
              <h4>{{ country.subregion ?? "Null" }}</h4>
              
            </div>
          </div>
          <div class="people">
            <div class="name-left">
              <p>Population: </p>
              <p>Area: </p>
              <p>Land Locked: </p>
              <p>Lat Long: </p>
              <p>Capital Lat Long: </p>
            </div>
            <div class="name-right">
              <h4>{{ country.population ?? "Null" }}</h4>
              <h4>{{ country.area ?? "Null" }}</h4>
              <h4>{{ country.landlocked ?? "Null" }}</h4>
              <h4>{{ country.latlng ?? "Null" }}</h4>
              <h4>{{ country.capitalInfo.latlng ?? "Null" }}</h4>
            </div>
          </div>
          <div class="independent">
            <div class="name-left">
              <p>Independent: </p>
              <p>Status: </p>
              <p>UN Member: </p>
              <p>FIFA: </p>
              <p>Start of Week: </p>
            </div>
            <div class="name-right">
              <h4>{{ country.independent ?? "Null" }}</h4>
              <h4>{{ country.status ?? "Null" }}</h4>
              <h4>{{ country.unMember ?? "Null" }}</h4>
              <h4>{{ country.fifa ?? "Null" }}</h4>
              <h4>{{ country.startOfWeek ?? "Null" }}</h4>
            </div>
          </div>
          <div class="coatArm" >
            <img :src="country.coatOfArms.png" style="height: 80px" />
            <p>Coat Of Arms</p>
          </div>
        </div>

        <el-divider style="margin: 5px; border-width: 2px;" />
        
        <div class="second-row">
          <div class="box">
            <h5>Capital</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <p v-for="(name, nameIndex) in country.capital" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          <div class="box1">
            <h5 >Language</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <p v-for="(name, nameIndex) in language(country.languages)" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          <div class="currency">
            <div class="box">
              <h5 >Currency</h5>
              <el-divider style="margin: 3px 0 10px 0;" />
              <p v-for="(name, nameIndex) in currency(country.currencies)" :key="(name, nameIndex)">{{ name }}</p>
            </div>
          </div>
          <div class="box">
              <h5>Native Name Official</h5>
              <el-divider style="margin: 3px 0 10px 0;" />
              <p v-for="(name, nameIndex) in officialName(country.name.nativeName)" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          <div class="box">
              <h5>Native Name Common</h5>
              <el-divider style="margin: 3px 0 10px 0;" />
              <p v-for="(name, nameIndex) in commonName(country.name.nativeName)" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          
        </div>

        <el-divider style="margin: 5px; border-width: 2px;" />

        <div class="third-row">
          
          <div class="box1">
            <h5>Alt Spellings</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <p v-for="(name, nameIndex) in country.altSpellings" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          
          <div class="box">
            <h5>Translation Official</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <p v-for="(name, nameIndex) in officialName(country.translations)" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          <div class="box">
            <h5>Translation Common</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <div class="box-name">
              <p v-for="(name, nameIndex) in commonName(country.translations)" :key="(name, nameIndex)">{{ name }}</p>
            </div>
          </div>
          <div class="box">
            <h5>Demonyms-F</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <div class="box-name">
              <p v-for="(name, nameIndex) in demonymsF(country.demonyms)" :key="(name, nameIndex)">{{ name }}</p>
            </div>
          </div>
          <div class="box">
            <h5>Demonyms-M</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <p v-for="(name, nameIndex) in demonymsM(country.demonyms)" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          
        </div>

        <el-divider style="margin: 5px; border-width: 2px;" />

        <div class="fourth-row">
          <div class="box1">
              <h5>Car (side)</h5>
              <el-divider style="margin: 3px 0 10px 0;" />
              <p v-for="(name, nameIndex) in country.car.signs" :key="(name, nameIndex)">{{ name + "("+ (country.car.side ?? "No Have") +")" }}</p>
          </div>
          <div class="box1">
              <h5>Continents</h5>
              <el-divider style="margin: 3px 0 10px 0;" />
              <p v-for="(name, nameIndex) in country.continents" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          <div class="box1" style="width: 75px">
              <h5>TLD</h5>
              <el-divider style="margin: 3px 0 10px 0;" />
              <p v-for="(name, nameIndex) in country.tld" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          <div class="box1" style="width: 85px;">
            <h5>IDD</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <p v-for="(name, nameIndex) in country.idd.suffixes" :key="(name, nameIndex)">{{ country.idd.root + name }}</p>
          </div>
          <div class="box1">
            <h5 >Code</h5>
            <el-divider style="margin: 3px 0 10px 0;" />
            <div class="code">
              <div class="name-left">
                <p>CCA2: </p>
                <p>CCA3: </p>
                <p>CCN3: </p>
                <p>CIOC: </p>
              </div>
              <div class="name-right">
                <h4>{{ country.cca2 }}</h4>
                <h4>{{ country.cca3 }}</h4>
                <h4>{{ country.ccn3 }}</h4>
                <h4>{{ country.cioc }}</h4>
              </div>
            </div>
          </div>
          <div class="box1">
              <h5>TimeZone</h5>
              <el-divider style="margin: 3px 0 10px 0;" />
              <p v-for="(name, nameIndex) in country.timezones" :key="(name, nameIndex)">{{ name }}</p>
          </div>
          
        </div>

        <el-divider style="margin: 5px; border-width: 2px;" />

        <div class="fifth-row">
          <div class="postalCode">
            <div class="name-left">
              <p v-if="country.postalCode && country.postalCode.format">postal Code (Format): </p>
              <p v-if="country.postalCode && country.postalCode.regex">postal Code (Regex): </p>
              <p v-if="country.maps && country.maps.googleMaps">Google Map: </p>
              <p >Open Street Map: </p>
            </div>
            <div class="name-right">
              <h4 v-if="country.postalCode && country.postalCode.format">{{ country.postalCode.format ?? "No Have" }}</h4>
              <h4 v-if="country.postalCode && country.postalCode.regex">{{ country.postalCode.regex ?? "No Have" }}</h4>
              <h4 v-if="country.maps && country.maps.googleMaps">{{ country.maps.googleMaps ?? "No Have" }}</h4>
              <h4 v-if="country.maps && country.maps.openStreetMaps">{{ country.maps.openStreetMaps ?? "No Have" }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Modal-Country',
  props: {
    country: Object,
    showPopup: Boolean 
  },
  data() {
    return {
      show: false,
    }
  },
  created() {
    console.log(this.country)
  },
  methods: {
    onClose() {
      this.$emit('onClose');
    },

    officialName(val) {
      if (val) {
          let name = [];
          for (let i=0; i<Object.values(val).length; i++) {
              if (i < Object.values(val).length)
              name.push(Object.values(val)[i].official);
          }
          return name;
      }
    },

    commonName(val) {
      if (val) {
          let name = [];
          for (let i=0; i<Object.values(val).length; i++) {
              if (i < Object.values(val).length)
              name.push(Object.values(val)[i].common);
          }
          return name;
      }
    },

    currency(val) {
      if (val) {
          let name = [];
          for (let i=0; i<Object.values(val).length; i++) {
              if (i < Object.values(val).length)
              name.push(Object.values(val)[i].name + "("+ Object.values(val)[i].symbol +")");
          }
          return name;
      }
    },

    language(val) {
      if (val) {
          let name = [];
          for (let i=0; i<Object.values(val).length; i++) {
              if (i < Object.values(val).length)
              name.push(Object.values(val)[i]);
          }
          return name;
      }
    },

    demonymsF(val) {
      if (val) {
          let name = [];
          for (let i=0; i<Object.values(val).length; i++) {
              if (i < Object.values(val).length)
              name.push(Object.values(val)[i].f);
          }
          return name;
      }
    },

    demonymsM(val) {
      if (val) {
          let name = [];
          for (let i=0; i<Object.values(val).length; i++) {
              if (i < Object.values(val).length)
              name.push(Object.values(val)[i].m);
          }
          return name;
      }
    },
  },
  
}
</script>

<style scoped>
.overlay{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,0.5);
    z-index:999;
    -webkit-animation: fadeIn .3s;
    animation: fadeIn .3s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal {
  background-color: #fff;
  max-height: 90vh;
  padding: 10px;
  margin: auto 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 90%;
  position: absolute;
  z-index:999;
}
.first-row, .second-row, .third-row, .fourth-row {
  display: flex;
  gap: 25px;
  padding: 10px;
  justify-content: space-evenly;
}

.fifth-row {
  display: flex;
  padding: 10px;
}
.name, .independent, .people, .code, .postalCode, .maps {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
}
.coatArm {
  display: flex; flex-direction: column; align-items: center;
}
.coatArm p {
  white-space: nowrap;
}
.name-left, .name-right {
  text-align: start;
}
.box {
  width: 200px;
  max-height: 250px;
  overflow-y: auto;
  text-align: start;
  overflow-x: hidden;
}
.box1 {
  text-align: start;
  width: 150px;
  max-height: 250px;
  overflow-y: auto;
  overflow-x: hidden;
}
.box p , .box1 p{
  text-align: start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.box h5, .box1 h5 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.flag-icon {
  max-height: 80px;
}
h1, h2, h3, h4, h5, h6, p {
  margin: 2px;
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>
