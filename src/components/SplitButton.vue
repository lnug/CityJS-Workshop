<template>
    <div :class="$style.wrap" @click="handleClick">
        <div
            :class="{
                [$style.left]: true,
                [$style.inactive]: mode === '2Player'
            }">
            <FontAwesomeIcon :icon="playerIcon" :class="$style.faTimes" /> 2 player
        </div>
        <div
            :class="{
                [$style.right]: true,
                [$style.inactive]: mode === 'ai'
            }">
            <FontAwesomeIcon :icon="computerIcon" :class="$style.faTimes" /> vs AI
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserFriends, faRobot } from "@fortawesome/free-solid-svg-icons";

export default {
    name: "SplitButton",
    props: {
        value: String,
        position: Number,
        mode: String
    },
    components: {
        FontAwesomeIcon,
    },
    computed: {
        playerIcon() {
            return faUserFriends
        },
        computerIcon() {
            return faRobot
        }
    },
    methods: {
        handleClick: function() {
            this.$emit('gameMode')
        }
    }
};
</script>

<style module>
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    cursor: pointer;
}

.left {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #8e6ef8;
    padding: 8px 15px;
    border-radius: 3px 0 0 3px;
    min-width: 100px;
    border-right: solid 1px #2a2a2a;
}

.right {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #8e6ef8;
    padding: 8px 15px;
    border-radius: 0px 3px 3px 0px;
    min-width: 100px;
    border-left: solid 1px #2a2a2a;
}

.inactive {
    opacity: 0.6;
}

.faTimes {
    font-size: 20px;
    margin-right: 10px;
}

</style>
