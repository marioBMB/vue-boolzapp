let app = new Vue({

    el: '#myapp',
    data: {

        inputIcon: "fas fa-microphone",
        inputValue: "",
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
    },
    methods: {

        setActive: function(index){
            this.activeContact = index;
        },
        handleInput: function(event){
            
            console.log(event.key);
            if (event.key == "Enter"){
                this.submitMessage();
            }
        },
        submitMessage: function(){
            
            let newMessage = this.createMessage(this.inputValue, true);
            this.inputValue = "";
            this.contacts[this.activeContact].messages.push(newMessage);
            setTimeout(this.simulateAnswer, 1000);
        },
        simulateAnswer: function(){
            
            let newMessage = this.createMessage("ok", false);
            this.contacts[this.activeContact].messages.push(newMessage);
        },

        createMessage: function(value, sent){

            let message = {
                date: '',
                text: value != "" ? value : '',
                status: sent ? 'sent' : 'received'
            };

            var today  = new Date();
            let Y = new Intl.DateTimeFormat('it', { year: 'numeric' }).format(today);
            let M = new Intl.DateTimeFormat('it', { month: '2-digit' }).format(today);
            let D = new Intl.DateTimeFormat('it', { day: '2-digit' }).format(today);
            let H = new Intl.DateTimeFormat('it', { hour: '2-digit' }).format(today);
            let m = new Intl.DateTimeFormat('it', { minute: '2-digit' }).format(today);
            
            message.date = `${D}/${M}/${Y} ${H}:${m}`;
            return message;
        },
        latestMessage: function(contactIndex){
            
            let activeMessages = this.contacts[contactIndex].messages;
            return activeMessages[activeMessages.length - 1];
        }
    },
    computed: {
        
    },




});