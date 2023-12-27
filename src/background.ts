// It probably doesn't make sense to both with React for Background Widgets as they don't render anything.
window.onload = function () {
  console.log('Sample Extension: background.js is running');

  ZOHODESK.extension.onload().then(function (App: any) {
    console.log('Sample Extension: App', App);

    App.instance.on('pageChange', function (data: any) {
      console.log('Sample Extension: Page Change Event Fired', data);
    });
    App.instance.on('ticket_Shift', function (data: any) {
      //data gives the new owner details
      ZOHODESK.get('ticket')
        .then(function (ticket) {
          console.log('Sample Extension:', ticket);
          ZOHODESK.showpopup({
            title: 'This custom popup is triggered by the background widget.',
            content:
              '<div><p>If you can read this, the ticket details have been fetched.</p><p style="font-weight:bold;">The ticket subject is ' +
              ticket.ticket.subject +
              '.</p></div>',
            type: 'alert',
            contentType: 'html',
            color: 'blue'
          }).then(
            (res) => {
              console.log('Sample Extension: success');
            },
            (err) => {
              console.log('Sample Extension: Err');
            }
          );
        })
        .then(
          (res) => {
            console.log('Sample Extension: success');
            ZOHODESK.invoke('ROUTE_TO', {
              entity: 'extension',
              location: 'desk.ticket.detail.lefttab', //invoke location
              name: 'Sample Left Tab Widget' //name of the widget
            });
          },
          (err) => {
            console.log('Sample Extension: Error getting ticket details');
          }
        );
    });
  });
};
