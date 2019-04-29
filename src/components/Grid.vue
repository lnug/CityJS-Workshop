<template>
    <div :class="$style.parapperTheWrapper">
        <div :class="$style.overlayWrap" v-if="won">
            <div :class="$style.emoji">🎉</div>
            <div :class="$style.winText">
                <FontAwesomeIcon
                    :icon="winIcon"
                    :class="{
                        [$style.faTimes]: true,
                        [$style.circleColor]: won === 1
                    }"
                />
                 wins
            </div>
        </div>
        <div :class="$style.gridWrap">
            <div :class="$style.row">
                <Square
                    :value="board[0]"
                    :position="0"
                    @squareClicked="handleClick"
                />
                <Square
                    :value="board[1]"
                    :position="1"
                    @squareClicked="handleClick"
                />
                <Square
                    :value="board[2]"
                    :position="2"
                    @squareClicked="handleClick"
                />
            </div>
            <div :class="$style.row">
                <Square
                    :value="board[3]"
                    :position="3"
                    @squareClicked="handleClick"
                />
                <Square
                    :value="board[4]"
                    :position="4"
                    @squareClicked="handleClick"
                />
                <Square
                    :value="board[5]"
                    :position="5"
                    @squareClicked="handleClick"
                />
            </div>
            <div :class="$style.row">
                <Square
                    :value="board[6]"
                    :position="6"
                    @squareClicked="handleClick"
                />
                <Square
                    :value="board[7]"
                    :position="7"
                    @squareClicked="handleClick"
                />
                <Square
                    :value="board[8]"
                    :position="8"
                    @squareClicked="handleClick"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import Square from "./Square.vue";
import { moves } from '../api';

const winContitions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

export default {
    name: "Grid",
    components: {
        Square,
        FontAwesomeIcon,
    },
    props: {
        turn: Number,
        locked: Boolean,
        game: String,
        mode: String,
    },
    data() {
        return {
            won: null,
            board: Array(9).fill(0)
        };
    },
    computed: {
        winIcon() {
            return this.won === -1 ? faTimes : faCircle
        }
    },
    methods: {
        handleClick: function(position) {
            if (this.locked) {
                return;
            }
            if (!this.board[position]) {
        
                this.board = this.board.map((el, index) => index === position ? this.turn : el);

                if (this.mode === 'ai') {
                    this.$emit("toggleLock");
                    if(this.win()) {
                        return
                    }
                    this.$emit("turnSwitch");
                    moves.getAIMove(this.board)
                        .then(response => {
                            const position = response.data.index
                            this.board = this.board.map((el, index) => index === position ? this.turn : el)
                            if(this.win()) {
                                return
                            }
                            this.$emit("turnSwitch");
                            this.$emit("toggleLock");
                        })
                    return
                }
                if(this.win()) {
                    return
                }
                this.$emit("turnSwitch");
            }
        },
        handleReset() {
            this.board = Array(9).fill(0)
            this.won = null
            if(this.mode === 'ai') {
                this.$emit("setTurnAi");
            }
        },
        win: function() {
            if (winContitions.find(
                el => 
                this.board[el[0]] === this.board[el[1]] && 
                this.board[el[1]] === this.board[el[2]] && 
                this.board[el[0]] !== 0 && 
                this.board[el[1]] !== 0 
                && this.board[el[2]] !== 0)
            ) {
                this.$emit("win", this.turn);
                this.won = this.turn
                return true;
            }
            return false;
        }
    }
};
</script>

<style module>
.gridWrap {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
    flex-direction: row;
}

.parapperTheWrapper {
    position: relative;
}

.overlayWrap {
    background-color: rgba(88, 88, 88, 0.8);
    z-index: 999;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.emoji {
    font-size: 50px;
}

.winText {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    color: #ffffff;
    font-weight: bold;
}

.faTimes {
    font-size: 60px;
    color: #6Eb7F8;
    padding-right: 30px;
}

.faCircle {
    font-size: 60px;
    color: #DF6C69;
    padding-right: 30px;
}

.circleColor {
    color: #DF6C69;
}
</style>
