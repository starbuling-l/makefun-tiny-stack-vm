import{mkdirSync as M,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs';
import{join as J}from'node:path';
function X(p,g){
let D=new Int32Array(256),C=new Int32Array(64),Y=new Int32Array(256),o=new Uint8Array(65536),s=0,c=0,P=0,t=0,n=0,i=0;
let E=x=>({o:o.slice(0,n),c:x});
for(;;){
if(t==1e6)return E(10);
if(P<0||P>=p.length)return E(9);
let a=p[P],m=a==1?1:a==2?4:a>=48&&a<=51?2:0,q=0,v=0;
if(a==0)q=0,v=0;
else if(a==1||a==2||a==82)q=0,v=1;
else if(a==3||a==80||a==81||a==83)q=1,v=0;
else if(a==4)q=1,v=2;
else if(a==5)q=2,v=2;
else if(a==6)q=2,v=3;
else if(a==7)q=3,v=3;
else if(a==23||a==27)q=1,v=1;
else if(a==48||a==51||a==52)q=0,v=0;
else if(a==49||a==50)q=1,v=0;
else if(a==64)q=1,v=1;
else if(a==65)q=2,v=0;
else if(a>=16&&a<=34&&a!=31)q=2,v=1;
else return E(5);
if(P+m>=p.length)return E(9);
t++;
if(s<q)return E(2);
if(s-q+v>256)return E(3);
let N=P+1+m;P=N;
if(a==0)return E(0);
if(a==1){D[s++]=(p[N-1]<<24)>>24;continue}
if(a==2){D[s++]=p[N-4]|p[N-3]<<8|p[N-2]<<16|p[N-1]<<24;continue}
if(a==3){s--;continue}
if(a==4){D[s]=D[s-1];s++;continue}
if(a==5){let z=D[s-1];D[s-1]=D[s-2];D[s-2]=z;continue}
if(a==6){D[s]=D[s-2];s++;continue}
if(a==7){let z=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=z;continue}
if(a==23){D[s-1]=-D[s-1]|0;continue}
if(a==27){D[s-1]=~D[s-1];continue}
if(a>=48&&a<=50){
let r=((p[N-2]|p[N-1]<<8)<<16)>>16,z=1;
if(a!=48){let y=D[--s];z=a==49?y==0:y!=0}
if(z)P=N+r;continue}
if(a==51){
if(c==64)return E(7);
C[c++]=N;P=p[N-2]|p[N-1]<<8;continue}
if(a==52){
if(c==0)return E(8);
P=C[--c];continue}
if(a==64){
let d=D[s-1];
if(d<0||d>255)return E(6);
D[s-1]=Y[d];continue}
if(a==65){
let d=D[s-1];
if(d<0||d>255)return E(6);
Y[d]=D[s-2];s-=2;continue}
if(a==80){
let b=String(D[s-1]);
if(n+b.length>65536)return E(11);
s--;for(let k=0;k<b.length;k++)o[n++]=b.charCodeAt(k);continue}
if(a==81){
if(n+1>65536)return E(11);
o[n++]=D[--s]&255;continue}
if(a==82){D[s++]=i<g.length?g[i++]:-1;continue}
if(a==83)return E(D[--s]&255);
let b=D[s-1],A=D[s-2],r=0;
if(a==16)r=A+b|0;
else if(a==17)r=A-b|0;
else if(a==18)r=Math.imul(A,b);
else if(a==19){if(!b)return E(4);r=A==-2147483648&&b==-1?A:(A/b)|0}
else if(a==20){if(!b)return E(4);r=b==-1?0:(A%b)|0}
else if(a==21){if(!b)return E(4);r=Math.floor((A>>>0)/(b>>>0))|0}
else if(a==22){if(!b)return E(4);r=((A>>>0)%(b>>>0))|0}
else if(a==24)r=A&b;
else if(a==25)r=A|b;
else if(a==26)r=A^b;
else if(a==28)r=A<<(b&31);
else if(a==29)r=A>>(b&31);
else if(a==30)r=(A>>>(b&31))|0;
else if(a==32)r=A==b?1:0;
else if(a==33)r=A<b?1:0;
else r=(A>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;
}
}
let I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(let d of R(I).sort()){
let r=X(new Uint8Array(F(J(I,d,'program.bin'))),new Uint8Array(F(J(I,d,'input.bin'))));
M(J(O,d),{recursive:true});
W(J(O,d,'stdout.bin'),r.o);
W(J(O,d,'exit.txt'),r.c+'\n');
}
