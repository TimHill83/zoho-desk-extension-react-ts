import { useEffect, useState } from 'react';
import PopupButton from './PopupButton';
import { RenderObject } from './RenderObject';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('not set!');
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    // waiting the ZOHODESK extension loading using it
    ZOHODESK.extension.onload().then(() => {
      setLoading(false);
      ZOHODESK.get('ticket.email').then((data) => {
        setEmail(data['ticket.email']);
      });
      ZOHODESK.get('ticket').then((data) => {
        setTicket(data['ticket']);
      });

      /*	
					//To Set data in Desk UI Client
					ZOHODESK.set('ticket.comment', { 'content': "Test comment" }).then(function (res) {
						//response Handling
					}).catch(function (err) {
						//error Handling
					});
		
					//Access Data Storage for an extension
					//Get the saved data of an extension from data storage
					ZOHODESK.get('database', { 'key': 'key1', 'queriableValue': 'value1' }).then(function (response) {
						//response Handling
					}).catch(function (err) {
						//error Handling
					})            
					
					//Save data in to data staorage
					ZOHODESK.set('database', { 'key': 'key_1', 'value': { 'id': 123 }, 'queriableValue': 'value1' }).then(function (response) {
						//response Handling
					}).catch(function (err) {
						//error Handling
					})
		
					//Change tabs in ticket detailview
					ZOHODESK.invoke('ROUTE_TO', 'ticket.attachments');
		
					//To Insert the content in the current opened reply editor from extension
					ZOHODESK.invoke('Insert', 'ticket.replyEditor', { content: "<p>your content</p>" });
		
					//To listen to an event in desk
					App.instance.on('comment_Added', function(data){
						//data handling 
					});
		
					//To access locale
					App.locale;
		
					//To access localresources
					App.localeResource            
						
					//To Know more on these, please read the documentation
				*/
    });
  });

  const setTicketComment = () => {
    console.log('setTicketComment');
    //To Set data in Desk UI Client
    ZOHODESK.set('ticket.comment', { comment: 'Test comment' })
      .then(function (res) {
        //response Handling
      })
      .catch(function (err) {
        //error Handling
      });
  };

  const setTicketReply = () => {
    console.log('setTicketReply');
    ZOHODESK.invoke('INSERT', 'ticket.replyEditor', {
      value: 'ABC Sample Content 456'
      //type: 'replace'
    });
    //To Set data in Desk UI Client
    // ZOHODESK.set('ticket.reply', {
    //   //value: '<h1>Hello</h1><p>THis is an HTML Reply</p>',
    //   reply: 'This is a plain text reply'
    //   //type: 'replace'
    // })
    //   .then(function (res) {
    //     console.log('success', res); //response Handling
    //   })
    //   .catch(function (err) {
    //     //error Handling
    //     console.log('fail', err);
    //   });
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h2>React Powered!</h2>
        <p>Email: {email}</p>
        <PopupButton
          title="Alert Button"
          content="This is an Alert Botton"
          type="alert"
          contentType={'html'}
          color="red"
          okText="OK"
        />
        <PopupButton
          title="Confirmation Button"
          content="This is a Confirmation Button"
          type="confirmation"
          contentType={'html'}
          color="blue"
          okText="Carry On"
          cancelText="Stop"
        />
        <button onClick={setTicketComment}>Set Ticket Comment</button>
        <button onClick={setTicketReply}>Set Ticket Reply</button>
        <RenderObject objectToRender={ticket} title="Ticket" />
      </>
    );
  }
};

export default App;
