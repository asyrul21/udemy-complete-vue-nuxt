function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
  data: function () {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles: function () {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles: function () {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 === 0;
    },
  },
  watch: {
    playerHealth(val) {
      if (val <= 0 && this.monsterHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (val <= 0) {
        // player loses
        this.winner = "monster";
      }
    },
    monsterHealth(val) {
      if (val <= 0 && this.playerHealth <= 0) {
        // draw
        this.winner = "draw";
      } else if (val <= 0) {
        // monster dies
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      // random number between 5 - 12
      const damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.addLogMessage("player", "attack", damage);
      this.attackPlayer();
    },
    attackPlayer() {
      // random number between 8 - 15
      const damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
      this.addLogMessage("monster", "attack", damage);
    },
    specialAttackMonster() {
      this.currentRound++;
      const damage = getRandomValue(10, 25);
      this.monsterHealth -= damage;
      this.addLogMessage("player", "attack", damage);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 0) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.addLogMessage("player", "surrender", null);
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
}).mount("#game");
