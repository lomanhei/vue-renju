let GameBoard,Rows,Columns,fc=0;const WIN_DETECTED=!1,LiveOne=8,DeadOne=1,LiveTwo=80,DeadTwo=10,LiveThree=800,DeadThree=100,LiveFour=8e3,DeadFour=1e3,Five=1e5;function eval_board(e,t,r){let o=0;const a=r[0],s=r[1],n=r[2],c=r[3];for(let r=a;r<n+1;r++)for(let a=s;a<c+1;a++)if(e[r][a]==t){let s=0,n=1;for(0!==a&&0===e[r][a-1]||s++,a++;a<Columns&&e[r][a]===t;a++)n++;a!==Columns&&0===e[r][a]||s++,o+=evaluateblock(s,n)}for(let r=s;r<c+1;r++)for(let s=a;s<n+1;s++)if(e[s][r]==t){let a=0,n=1;for(0!==s&&0===e[s-1][r]||a++,s++;s<Rows&&e[s][r]===t;s++)n++;s!==Rows&&0===e[s][r]||a++,o+=evaluateblock(a,n)}for(let r=a;r<c-s+n;r+=1){let u=r,i=s;for(;u>=a&&i<=c;){if(u<=n&&e[u][i]===t){let r=0,a=1;for(0!==i&&u!==Rows-1&&0===e[u+1][i-1]||r++,u--,i++;u>=0&&e[u][i]===t;u--)a++,i++;(u<0||i===Columns||0!==e[u][i])&&r++,o+=evaluateblock(r,a)}u-=1,i+=1}}for(let r=a-(c-s);r<=n;r++){let u=r,i=s;for(;u<=n&&i<=c;){if(u>=a&&u<=n&&e[u][i]===t){let r=0,a=1;for(0!==i&&0!==u&&0===e[u-1][i-1]||r++,u++,i++;u<Rows&&e[u][i]==t;u++)a++,i++;u!==Rows&&i!==Columns&&0===e[u][i]||r++,o+=evaluateblock(r,a)}u+=1,i+=1}}return o}function evaluateblock(e,t){if(0===e)switch(t){case 1:return 8;case 2:return 80;case 3:return 800;case 4:return 8e3;default:return Five}else{if(1!==e)return t>=5?Five:0;switch(t){case 1:return 1;case 2:return 10;case 3:return 100;case 4:return 1e3;default:return Five}}}function check_directions(e){for(let t=0;t<e.length-4;t++)if(0!==e[t]&&e[t]===e[t+1]&&e[t]===e[t+2]&&e[t]===e[t+3]&&e[t]===e[t+4])return!0}function get_directions(e,t,r){const o=[[],[],[],[]];for(let a=-4;a<5;a++)t+a>=0&&t+a<=Rows-1&&(o[0].push(e[t+a][r]),r+a>=0&&r+a<=Columns-1&&o[2].push(e[t+a][r+a])),r+a>=0&&r+a<=Columns-1&&(o[1].push(e[t][r+a]),t-a>=0&&t-a<=Rows-1&&o[3].push(e[t-a][r+a]));return o}function checkwin(e,t,r){const o=get_directions(e,t,r);for(let e=0;e<4;e++)if(check_directions(o[e]))return!0}function Get_last_best(){return bestmoves}function Set_last_best(e){for(let t=0;t<bestmoves.length;t++)bestmoves[t].i===e.i&&bestmoves[t].j===e.j&&bestmoves.splice(t,1);bestmoves.unshift(e)}function remoteCell(e,t,r){for(let o=t-2;o<=t+2;o++)if(!(o<0||o>=Rows))for(let t=r-2;t<=r+2;t++)if(!(t<0||t>=Columns)&&0!==e[o][t])return!1;return!0}function Get_restrictions(e){let t=1/0,r=1/0,o=-1/0,a=-1/0;for(let s=0;s<Rows;s++)for(let n=0;n<Columns;n++)0!==e[s][n]&&(t=Math.min(t,s),r=Math.min(r,n),o=Math.max(o,s),a=Math.max(a,n));return t-2<0&&(t=2),r-2<0&&(r=2),o+2>=Rows&&(o=Rows-3),a+2>=Columns&&(a=Columns-3),[t,r,o,a]}function Change_restrictions(e,t,r){let o=e[0],a=e[1],s=e[2],n=e[3];return t<o?o=t:t>s&&(s=t),r<a?a=r:r>n&&(n=r),o-2<0&&(o=2),a-2<0&&(a=2),s+2>=Rows&&(s=Rows-3),n+2>=Columns&&(n=Columns-3),[o,a,s,n]}function compare(e,t){return e.score<t.score?1:e.score>t.score?-1:0}function BoardGenerator(e,t,r){const o=[],a=e[0],s=e[1],n=e[2],c=e[3];for(let e=a-2;e<=n+2;e++)for(let a=s-2;a<=c+2;a++)if(0===t[e][a]&&!remoteCell(t,e,a)){const s={};if(s.i=e,s.j=a,s.score=evaluate_move(t,e,a,r),false===s.score)return[s];o.push(s)}return o.sort(compare),o.slice(0,10)}function evaluate_direction(e,t){let r=0;for(let o=0;o+4<e.length;o++){let a=0,s=0;for(let r=0;r<=4;r++)e[o+r]===t?a+=1:e[o+r]===-t&&(s+=1);if(r+=evalff(get_seq(a,s)),r>=8e5)return false}return r}function evalff(e){switch(e){case 0:return 7;case 1:return 35;case 2:return 800;case 3:return 15e3;case 4:return 8e5;case-1:return 15;case-2:return 350;case-3:return 8e3;case-4:return 6e5;case 17:return 0}}function get_seq(e,t){let r=Sum%2?1:-1;return e+t===0?0:0!==e&&0===t?r*e:0===e&&0!==t?-r*t:0!==e&&0!==t?17:void 0}function evaluate_move(e,t,r,o){let a=0;const s=get_directions(e,t,r);let n;for(let e=0;e<4;e++){if(n=evaluate_direction(s[e],o),false===n)return 8e5;a+=n}return a}function evaluate_state(e,t,r,o){const a=eval_board(e,-1,o),s=eval_board(e,1,o);let n=0;return n=-1==t?a-s:s-a,StateCache.set(r,n),StateCachePuts++,n}function random32(){let e=new Uint32Array(1);return self.crypto.getRandomValues(e),e[0]}function Table_init(){for(let e=0;e<Rows;e++){Table[e]=[];for(let t=0;t<Columns;t++)Table[e][t]=[],Table[e][t][0]=random32(),Table[e][t][1]=random32()}}function hash(e){let t,r=0;for(let o=0;o<Rows;o++)for(let a=0;a<Columns;a++){let s=e[o][a];0!==s&&(t=-1===s?0:1,r^=Table[o][a][t])}return r}function update_hash(e,t,r,o){return t=-1===t?0:1,e^=Table[r][o][t]}function mtdf(e,t,r,o){let a,s,n=t,c=1/0,u=-1/0;do{if(a=n===u?n+1:n,TIMEOUT())return"stop";let t=negamax(e,1,r,a-1,a,hash(e),o,0,0);if(TIMEOUT())return"stop";void 0!==t&&(n=t.score,s=t),n<a?c=n:u=n}while(u<c);return s}function TIMEOUT(){return Date.now()-startTime>=MaximumTimeForMove}function iterative_mtdf(e){const t=Get_restrictions(e);let r,o=evaluate_state(e,1,hash(GameBoard),[0,0,Rows-1,Columns-1]);bestmoves=BoardGenerator(t,e,1);let a=4;for(;!TIMEOUT();){MaximumDepth=a;let s=mtdf(e,o,a,t);if("stop"===s)break;r=s,Set_last_best(r);Date.now();if(Math.abs(r.score)>1999900)return r;o=r.score,a+=2}return r}function negamax(e,t,r,o,a,s,n,c,u){if(TIMEOUT())return 1;const i=o,l=Cache.get(s);if(void 0!==l&&l.depth>=r){CacheHits++;const e=l.score;if(0===l.Flag)return CacheCutoffs++,e;if(-1===l.Flag?o=Math.max(o,e):1===l.Flag&&(a=Math.min(a,e)),o>=a)return CacheCutoffs++,e}if(fc++,checkwin(e,c,u))return MaximumDepth-r-2e6;if(0===r){const r=StateCache.get(s);return void 0!==r?(StateCacheHits++,r):evaluate_state(e,t,s,n)}let f;if(f=r===MaximumDepth?Get_last_best():BoardGenerator(n,e,t),0===f.length)return 0;const m={};let h=-1/0;for(let c=0;c<f.length;c++){let u=f[c].i,i=f[c].j;const l=update_hash(s,t,u,i);e[u][i]=t;const C=-negamax(e,-t,r-1,-a,-o,l,Change_restrictions(n,u,i),u,i);if(e[u][i]=0,C>h&&(h=C,r==MaximumDepth&&(m.i=u,m.j=i,m.score=C)),(o=Math.max(o,C))>=a)break}CachePuts++;const C={score:h,depth:r};return C.Flag=h<=i?1:h>=a?-1:0,Cache.set(s,C),r==MaximumDepth?m:h}const Table=[],Cache=new Map,StateCache=new Map;let MaximumDepth,MaximumTimeForMove,startTime,bestmoves=[],CacheHits=0,Cutoffs=0,CacheCutoffs=0,CachePuts=0,StateCachePuts=0,StateCacheHits=0,Sum=0;function search(){startTime=Date.now();const e=performance.now(),t=iterative_mtdf(GameBoard),r=performance.now();return Cache.clear(),StateCache.clear(),{firstMoves:BoardGenerator(Get_restrictions(GameBoard),GameBoard,1),bestmove:t,CacheHits:CacheHits,CacheCutoffs:CacheCutoffs,CachePuts:CachePuts,StateCacheHits:StateCacheHits,StateCachePuts:StateCachePuts,fc:fc,time:(r-e)/1e3}}onmessage=function(e){const t=e.data[0];if(MaximumTimeForMove=e.data[2],t){GameBoard=t,Rows=GameBoard.length,Columns=GameBoard[0].length;let e=0;for(let t=0;t<Rows;t++)for(let r=0;r<Columns;r++)0!==GameBoard[t][r]&&e++;if(Sum=e,0===e)return void postMessage({firstMoves:0,bestmove:{i:7,j:7,score:1e3},CacheHits:0,CacheCutoffs:0,CachePuts:0,StateCacheHits:0,StateCachePuts:0,fc:0,time:0});CacheHits=0,Cutoffs=0,CacheCutoffs=0,CachePuts=0,StateCachePuts=0,fc=0,Table_init();const r=search();postMessage(r)}};
