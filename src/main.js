import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

new Vue({
    el: '#app',
    components: {
        'movie-list': {
            template: `<div id="movie-list">
                           <div v-for="movie in movies"
                                class="movie">{{ movie.title }}</div>
                       </div>`,
            data(){ //must be a function
                return {
                    movies: [
                        { title: 'Pulp Fiction' },
                        { title: 'Home Alone' },
                        { title: 'Austin Powers' }
                    ]
                }
            }
        },
        'movie-filter': {
            data() {
                return {
                    genres //genres is imported from above. 
                }
            },
            template: `<div id="movie-filter">
                           <h2>Filter Results</h2>
                           <div class="filter-group">
                                <check-filter v-for="genre in genres"
                                              v-on:check-filter="checkFilter"
                                              :title="genre"></check-filter>
                           </div>
                       </div>`,
            methods: {
                checkFilter(){
                    console.log('check filter called');
                }
            },
            components: {
                'check-filter': {
                    data(){
                        return {
                            checked: false
                        };
                    },
                    props: ['title'], //any props that are passed down must be registered here
                    template: `<div class="{'check-filter': true, active: checked}"
                                    @click="checkFilter">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{ title }}</span>
                               </div>`,
                    methods: {
                        checkFilter(){
                            console.log('last called');
                            this.checked = !this.checked;
                            console.log(this.checked);
                            this.$emit('check-filter');
                        }
                    }
                }
            }
        }, 
    }
});