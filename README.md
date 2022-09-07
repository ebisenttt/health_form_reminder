# health_form_reminder

※これは，高校教員が作成した校内向けサービスのソースコード（一部改変）です。

## プログラムの概要

Google Form の未提出者を Google Classroom のストリームに通知する API です

## 背景と課題

毎朝 Google Form で体温や出欠を入力することになっています。未入力者が多いことが課題です。朝のホームルーム時に未入力者を指摘しますが，Spread Sheet
に表示されているのは，提出された生徒の回答，つまり提出済みの生徒氏名等です。必要なのは未提出の生徒名であり，この確認に手間が発生していました。

## このプログラムが何をするか

朝のホームルーム前の時間帯，昼休み開始時に Google Classroom にて生徒名を通知します。

これにより，朝のホームルーム前に生徒へのフォーム入力のリマインドを行い，かつホームルーム時に教員側が未提出の生徒名一覧を見ることができる環境ができました。念の為，生徒がスマートフォンを触る機会が多い昼休みにも通知するように設計しています。
