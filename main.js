Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        // here I check that click was outside the el and his children
        if (!(el == event.target || el.contains(event.target))) {
          // and if it did, call method provided in attribute value
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
      document.body.removeEventListener('click', el.clickOutsideEvent)
    },
})
  
new Vue({

    el: '#myapp',
    data: {

        inputIcon: "fas fa-microphone",
        inputValue: "",
        inputSearchValue: "",
        activeContact: -1,
        darkMode: 0,
        user: {
            name: 'Mario',
            avatar: '_0',
        },
        status: ['', 'online', 'sta scrivendo...'],
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                statusCode: 0,  /* 0 standBy 1 activeUser 2 writing */
                visible: true,
                storedInput: "",
                messages: [
                    {
                        date: '10/01/2020 15:30',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 15:50',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 16:15',
                        text: 'Tutto fatto!',
                        status: 'received',
                    },
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                statusCode: 0,
                visible: true,
                storedInput: "",
                messages: [
                    {
                        date: '20/03/2020 16:30',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {   date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                statusCode: 0,
                visible: true,
                storedInput: "",
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'received'
                    },
                    {   date: '28/03/2020 16:15',
                        text: 'Ah scusa',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                statusCode: 0,
                visible: true,
                storedInput: "",
                messages: [
                    {   date: '10/01/2020 15:30',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {   date: '10/01/2020 15:50',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            }
        ],
        filteredContacts: [],
    },
    methods: {

        setActive: function(index){
            this.activeContact = index;
        },
        handleInput: function(event){

            if (this.inputValue.trim() == ""){
                this.inputValue = "";
            }
            else if (event.key == "Enter"){
                this.submitMessage();
                this.contacts[this.activeContact].storedInput = this.inputValue;
            }
        },
        submitMessage: function(){
            
            let newMessage = this.createMessage(this.inputValue, true);
            this.inputValue = "";
            this.contacts[this.activeContact].messages.push(newMessage);
            this.simulateAnswer();
        },
        removeMessage: function(index){

            this.contacts[this.activeContact].messages.splice(index, 1);
        },
        simulateAnswer: function(){
            
            this.contacts[this.activeContact].statusCode = 2;
            setTimeout(() => {

                let newMessage = this.createMessage("ok", false);
                this.contacts[this.activeContact].messages.push(newMessage);
                this.contacts[this.activeContact].statusCode = 1;

                setTimeout(() => {
                    this.contacts[this.activeContact].statusCode = 0;
                }, 3000);                

            }, 2000);

        },
        createMessage: function(value, sent){

            let message = {
                date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                text: value != "" ? value : '',
                status: sent ? 'sent' : 'received'
            };

            return message;
        },
        latestMessage: function(contactIndex){

            let activeMessages = this.contacts[contactIndex].messages;
            return activeMessages[activeMessages.length - 1];
        },

        filterInput: function(){

            this.filteredContacts = this.contacts.filter((item) => {

                return item.name.includes(this.inputSearchValue);
            });
        },
        scrollChat: function(){
            let box = document.querySelector(".messages");
            if (box != null){

                box.scrollTop = box.scrollHeight;
                console.log(box.scrollHeight);
            }
        },
        isEmptyString(value){

            return value.trim().length == 0;
        },
        isActiveUser(index){
            return (this.contacts[index].statusCode >= 1 );
        },
        toggleContextualMenu(event){

            event.stopPropagation(); // impedisce che l'evento di click "fuori" venga intercettato dal gestore closeDropdowns
            let parentNode = event.target.parentNode;
            let thisDropdown = parentNode.querySelector(".dropdown");
            thisDropdown.classList.toggle("show");
        },
        deleteMessages(){

            this.contacts[activeContacts].messages = [];
        },
        deleteChat(index){
            this.contacts.splice(index, 1);
            activeContact = -1;
        },
        toggleDarkMode(event){

            let box = document.getElementById("myapp");
            box.classList.toggle("dark");
            this.darkMode = !this.darkMode;
        },
        closeDropdowns(event){
            
            // let dropdowns = document.querySelectorAll(".dropdown");

            // dropdowns.forEach(dropdown => {
            //     dropdown.style.display = 'none';
            // });
        },
        closeDropdown: function(event){
            event.stopPropagation();
            console.log(event.target.parentNode.querySelector(".dropdown"));
            // event.target.parentNode.querySelector(".dropdown").classList.toggle("show");
        },
    },
    mounted: function(){
        this.filteredContacts = this.contacts;
    },
    updated: function(){ 
        this.scrollChat();
    },

});



  