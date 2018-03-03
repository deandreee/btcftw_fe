import splitter from './splitter';
import styles from 'app/styles';
import md from 'utils/md';
import access from 'safe-access';

export default function (params,ticket,callback) {

  console.log('tooltip', params);

  let data = access(params, '[0].data');
  let seriesIndex = access(params, '[0].seriesIndex');
  if (!data || seriesIndex !== 1) { // only for scatter
    return;
  }

  setTimeout(function (){

    let txt = data[2] || data[1];
    if (!txt) {
      callback(ticket, txt);
    }
    else {
      // https://stackoverflow.com/questions/7624713/js-splitting-a-long-string-into-strings-with-char-limit-while-avoiding-splittin
      // split without breaking words
      // let parts = txt.toString().match(/.{1,100}/g);
      let length = md.phone() ? 30 : 70;
      let parts = splitter(txt, length); // .match(/(.{1,200}(\s|$))\s*/g);
      let res = parts.map(x => `<p>${x}</p>`).join('');

      let permalink = data[3];
      if (permalink) {
        res += `<a target="_blank" style="color: green" href="https://reddit.com/${permalink}">View in Reddit</a>`;
      }

      callback(ticket, res);
    }

  }, 100)

  return 'loading';
}
