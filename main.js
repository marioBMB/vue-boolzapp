let app = new Vue({

    el: '#myapp',
    data: {

        inputIcon: "fas fa-microphone",
        inputValue: "",
        inputSearchValue: "",
        activeContact: 1,
        user: {
            name: 'Mario',
            avatar: '_0',
        },
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                storedInput: "",
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                    },
                    {
                        date: '10/01/2020 16:15:05',
                        text: 'Tutto fatto!',
                        status: 'received',
                    },
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                storedInput: "",
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
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
                visible: true,
                storedInput: "",
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'received'
                    },
                    {   date: '28/03/2020 16:15:22',
                        text: 'Ah scusa',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                storedInput: "",
                messages: [
                    {   date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {   date: '10/01/2020 15:50:00',
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
            if (event.key == "Enter"){
                this.submitMessage();
                this.contacts[this.activeContact].sotredInput = this.inputValue;
            }
        },
        submitMessage: function(){
            
            let newMessage = this.createMessage(this.inputValue, true);
            this.inputValue = "";
            this.contacts[this.activeContact].messages.push(newMessage);
            
            // setTimeout(this.simulateAnswer, 1000);
        },
        removeMessage: function(index){

            this.contacts[this.activeContact].messages.splice(index, 1);
        },
        simulateAnswer: function(){
            
            let newMessage = this.createMessage("ok", false);
            this.contacts[this.activeContact].messages.push(newMessage);
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
            box.scrollTop = box.scrollHeight;
            console.log(box.scrollHeight);
        },
        isEmptyString(value){

            return value.trim().length == 0;
        }
        
    },
    mounted: function(){

        this.filteredContacts = this.contacts;
    },
    updated: function(){ this.scrollChat() },


});