<template>
    <div class="index-page">
        <div class="text">
            <h1 class="title">List Country</h1>
            <p class="sub-title">General Information of Country (Flag, Country Name, 2 and 3 character Country Code...) </p>
        </div>
        <div class="search-area">
            <input @input="onSearch" v-model="query" type="text" placeholder="Search by country name"
            @keydown="isSearching = true"
                class="search" />
            <div v-if="filterCountry[0] && (query !== '') && isSearching"
                class="wrapper">
                <div class="box">
                    <div @click="onChooseItem(item)"
                        v-for="(item,itemIndex) in filterCountry" :key="(item,itemIndex)"
                        class="item">
                        <img :src="(item.flags.png)"
                            class="item-img" />
                        <p class="item-name" title="Product Name">
                            {{item.name.official}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="body">
        <table class="table">
            <thead>
                <tr>
                    <th width="50px">Flag</th>
                    <th width="200px" style="cursor: pointer;" @click="sortName()" >
                        <div class="title-sort">
                            <p style="margin: 0;">Country Name</p>
                            <img v-if="isAsc === false" class="sort-icon" src="@/assets/icon/ios-arrow-up.png" alt="">
                            <img v-else class="sort-icon" src="@/assets/icon/ios-arrow-down.png" alt="">
                        </div>
                    </th>
                    <th width="250px">Native Country Name</th>
                    <th width="150px">Alternative Country Name</th>
                    <th style="text-align: end;">2 Character Country Code </th>
                    <th style="text-align: end;">3 Character Country Code </th>
                    <th style="text-align: end;">Country Calling Code</th>
                </tr>
            </thead>
            <tbody>
                <tr class="hover-list" v-for="(country, countryIndex) in countryList" :key="(country, countryIndex)">
                    <td>
                        <img class="flag" :src="(country.flags.png)" alt="">
                    </td>
                    <td style="cursor: pointer;" @click="onChooseItem(country)">{{ country.name.official }}</td>
                    <td>
                        <tr v-for="(name, nameIndex) in nativeName(country.name.nativeName)" :key="(name, nameIndex)">
                            <td style="border: none; padding: 10px 0;">
                                {{ name }}
                            </td>
                        </tr>
                    </td>
                    <td>
                        <tr v-for="(alt, altIndex) in country.altSpellings" :key="(alt, altIndex)">
                            <td style="border: none; padding: 10px 0;">
                                {{ alt }}
                            </td>
                        </tr>
                    </td>
                    <td style="text-align: center;">{{ country.cca2 }}</td>
                    <td style="text-align: center;">{{ country.cca3 }}</td>
                    <td>
                        <tr v-for="(idd,iddIndex) in country.idd.suffixes" :key="(idd,iddIndex)" style="display: flex; flex-direction: column;">
                            <td style="text-align: center; border: none; padding: 10px 0;">
                                {{ country.idd.root + idd }}
                            </td>
                        </tr>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="list[0]" class="pagination">
            <el-pagination
                v-model:current-page="currentPage"
                :page-size="pageSize"
                :pager-count="pagerCount"
                layout="prev, pager, next"
                :total="list.length"
                @current-change="handleCurrentChange"
            />
        </div>
    </div>
   <ModalCountry v-if="show" :country="country" @onClose="onClose"></ModalCountry>
</template>
    
<script>
import ApiService from '@/services/Service'
import ModalCountry from '@/components/Modal'

export default {
    name: "List-Country",
    data() {
        return {
            currentPage: 1,
            pageSize: 25,
            pagerCount: 10,
            query: "",
            list: [],
            countryList: [],
            filterCountry: [],
            isAsc: true,
            isSearching: true,
            country: {},
            show: false,
        }
    },
    components: {
        ModalCountry,
    },
    created() {
        this.getList();
    },
    watch: {
        show: function() {
        if(this.show){
            document.documentElement.style.overflow = 'hidden'
            return
        }
        document.documentElement.style.overflow = 'auto'
        }
    },
    methods: {
        getList() {
            ApiService.getHome().then((result) => {
                if (result.status === 200) {
                    this.list = result.data
                    this.sortName()
                }
            })
        },

        onSearch() {
            this.filterCountry = this.list.filter(item => item.name.official.toLowerCase().includes(this.query.toLowerCase()))
        },

        onChooseItem(item) {
            this.isSearching  = false;
            this.show = true
            this.country = item;
        },

        onClose() {
            this.show = false;
        },

        sortName() {
            this.currentPage = 1
            if (this.isAsc) {
                this.list = this.list.sort((i, j) => i.name.official.toLowerCase().localeCompare(j.name.official.toLowerCase()));
            } else {
                this.list.reverse()
            }
            this.isAsc = !this.isAsc
            this.handleCurrentChange()
        },
        
        nativeName(val) {
            if (val) {
                let name = [];
                for (let i=0; i<Object.values(val).length; i++) {
                    if (i < Object.values(val).length)
                    name.push(Object.values(val)[i].official);
                }
                return name;
            }
        },
        
        handleCurrentChange(val = 1) {
            const chunkSize = this.pageSize;
            let array = []

            // splice list 
            for (let i = 0; i < this.list.length; i += chunkSize) {
                array.push(this.list.slice(i, i + chunkSize));
            }

            // change page number
            for (let i=0; i < array.length; i++) {
                if (i === val-1) {
                    this.countryList = array[i];
                    window.scrollTo(0, 0);
                }
            }
        },
    }
}
</script>
<style scoped src="./list.css">
</style>
