import React from 'react';
import { View, Text, Button, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Print from 'expo-print';
import { AntDesign, Fontisto } from "@expo/vector-icons";


const ModalComponent = ({ isModalVisible, selectedRowData, closeModal }) => {
    const item = selectedRowData;

    const date = new Date();
    const todayDate = 1;
    const time = 1;
    const table = [];
    const storedPrices = [];

    const priceBox = 'border-left: 1px dashed #000000; border-right: 1px dashed #000000; border-top: 1px solid #000000; font-size: 12px;';
    const InputBox = 'border-left: 2px solid #000000; border-top: 1px solid #000000; font-size: 12px;';
    const totalPriceLeftSideBox = 'border-top: 1px solid #000000; font-size: 12px;';
    const totalPriceRightSideBox = 'border-top: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px;';

    const html = (forPrint) => `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body,div,table,thead,tbody,tfoot,tr,th,td,p { font-family:"Calibri"; font-size:small }
            a.comment-indicator:hover + comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em;  }
            a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em;  }
            comment { display:none;  }
        </style>
    </head>
    
    <body style="display: flex; justify-content: center; align-items: center; zoom: ${forPrint ? 100 : 150}%; ">
    <table align="left" cellspacing="0" border="0">
        <colgroup width="102"></colgroup> 
        <colgroup width="72"></colgroup>  
        <colgroup width="173"></colgroup> 
        <colgroup span="2" width="49"></colgroup> 
        <colgroup width="49"></colgroup> 
        <colgroup width="46"></colgroup> 
        <colgroup width="50"></colgroup> 
        <colgroup width="48"></colgroup> 
        <colgroup width="50"></colgroup> 
        ${forPrint ? `<tr>
            <td colspan=3 height="21" align="left" valign=middle><b>PREKI&#370; DEFEKTAVIMO AKTAS</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" colspan=6 align="center" valign=middle bgcolor="#BDD7EE"><b>UAB &quot;Baltic Pallets&quot; Kaunas Elektr&#279;n&#371; g. 16</b></td>
        </tr>

        <tr>
            <td  align="center" valign=bottom><br></td>
            <td align="left" valign=middle><br></td>
            <td align="left" valign=middle><b><br></b></td>
            <td style="height: 25px; border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 20px" colspan=6 align="center" valign=middle>${todayDate + " " + time}</td>
        </tr>` : ``
    }
        

        <tr>
            <td height="7" align="left" valign=middle><b><br></b></td>
            <td align="left" valign=middle><b><br></b></td>
            <td align="left" valign=middle sdnum="1033;0;#,##0.00&quot; &euro;&quot;;[RED]#,##0.00&quot; &euro;&quot;"><br></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><br></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><br></td>
            <td align="left" valign=middle sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><br></td>
            <td align="center" valign=bottom><b><br></b></td>
            <td align="left" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><b><br></b></td>
            <td align="left" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;YYYY&quot; m. &quot;MMMM D&quot; d.&quot;;@"><b><br></b></td>
        </tr>
        <tr>
            <td height="17" align="center" valign=bottom><br></td>
            <td align="left" valign=middle><br></td>
            <td align="left" valign=middle><br></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" colspan=3 align="center" valign=middle bgcolor="#BDD7EE"><b>Sveiki pad&#279;klai</b></td>
            <td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" colspan=3 align="center" valign=middle bgcolor="#BDD7EE"><b>Remontuotini </b></td>
        </tr>
        <tr>
            <td height="28" align="center" valign=bottom><br></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 12px" colspan=2 align="center" valign=middle bgcolor="#D9D9D9"><b>PREK&#278;S r&#363;&scaron;is</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#BDD7EE">Kiekis</td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#BDD7EE">Kaina &euro; /vnt</td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#BDD7EE"><i>Suma</i></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#BDD7EE">Kiekis</td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#BDD7EE">Kaina &euro; /vnt</td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#BDD7EE"><i>Suma</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" rowspan=9 align="center" valign=middle bgcolor="#D9D9D9"><b>800x1200</b></td>
            <td style="font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b>EUR-A 1</b></td>
            <td style="font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="border-left: 2px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#FFE796" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item1.units || ''}</b></td>
            <td style="border-left: 1px dashed #000000; border-right: 1px dashed #000000; font-size: 12px" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item1.prices}</td>
            <td style="font-size: 12px" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item1.results || ''}</i></td>
            <td style="border-left: 2px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#FFE796" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item1.units || ''}</b></td>
            <td style="border-left: 1px dashed #000000; border-right: 1px dashed #000000; font-size: 12px" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item1.prices}</td>
            <td style="border-right: 1px solid #000000; font-size: 12px" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item1.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b>EUR-A </b></td>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item2.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item2.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item2.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item2.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item2.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item2.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b>EUR-B</b></td>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item3.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item3.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item3.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item3.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item3.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item3.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px double #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b></br></b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px double #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"></br></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;"  align="center" valign=middle bgcolor="#FFE796"><b></b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"></td>
            <td style="${totalPriceLeftSideBox}  border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i></i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b></b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"></td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i></i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px double #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b>LSD</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px double #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item4.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item4.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item4.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item4.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item4.prices}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item4.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b>SD</b>           </td>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item5.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item5.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item5.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item5.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item5.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item5.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b>SD AP</b>        </td>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item6.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item6.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item6.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item6.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item6.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item6.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b>PM</b>           </td>
            <td style="border-top: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item7.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item7.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item7.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item7.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item7.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item7.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF"><b>Knauf</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" align="left" valign=middle bgcolor="#FFFFFF">800 x 1200 mm.</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item8.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item8.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item8.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item8.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item8.prices}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item8.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" rowspan=6 align="center" valign=middle bgcolor="#D9D9D9"><b>1000x1200</b></td>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000 x 1200 mm. <b>LSD, FIN</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item9.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item9.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item9.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item9.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item9.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item9.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000 x 1200 mm. <b>SD, perimetriniai</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item10.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item10.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item10.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item10.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item10.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item10.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000 x 1200 mm. <b>PM, perimetriniai, SD AP</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item11.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item11.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item11.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item11.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item11.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item11.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"></br></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item12.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item12.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item12.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item12.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item12.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item12.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000x1200x138 mm. <b>CP1</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item13.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item13.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item13.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item13.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item13.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item13.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1000x1200x156 mm. <b>CP6</></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item14.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item14.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item14.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item14.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item14.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item14.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" rowspan=3 align="center" valign=middle bgcolor="#D9D9D9"><b>1140x1140</b></td>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>LSD, SD</b> 1140 x 1140 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item15.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item15.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item15.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item15.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item15.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item15.results || ''}</i></td>
        </tr>
        <tr>
      
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>CP3</b>, 1140x1140x138 mm. </td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item16.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item16.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item16.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item16.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item16.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item16.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>CP9</b>, 1140x1140x156 mm. </td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item17.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item17.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item17.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item17.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item17.prices}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item17.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" align="center" valign=bottom bgcolor="#D9D9D9"><b>PAROC</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1200 x 1750 mm.; 1200 x 1800 mm. <b>&quot;Paroc&quot;</b> </td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item18.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item18.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item18.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item18.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item18.prices}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item18.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" align="center" valign=bottom bgcolor="#D9D9D9"><b>KNAUF</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>&quot;Knauf&quot; pad&#279;klas nuo gipso </b></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item19.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item19.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item19.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item19.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item19.prices}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item19.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" rowspan=8 height="160" align="center" valign=middle bgcolor="#D9D9D9"><b>Nestandartai</b></td>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle>600 x 800 mm. LSD, SD</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item20.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item20.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item20.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item20.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item20.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item20.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle>800 x 800 mm.;  LSD, SD</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item21.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item21.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item21.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item21.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item21.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item21.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>1000 x 1000 mm.  LSD, SD</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item22.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item22.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item22.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item22.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item22.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item22.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle>1100 x 1100 mm.  LSD, SD</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item23.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item23.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item23.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item23.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item23.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item23.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">1200 x 1200 mm., <b>LSD, SD</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item24.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item24.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item24.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item24.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item24.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item24.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>1100 x 1300 mm., CP7,PRS,SD,LSD</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item25.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item25.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item25.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item25.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item25.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item25.results || ''}</i></td>
        </tr>
        <tr>
       
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Nestandartiniai padėklai</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item26.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item26.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item26.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item26.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item26.prices}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item26.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" rowspan=5 height="100" align="center" valign=middle bgcolor="#D9D9D9"><b>&Scaron;arnyrai</b></td>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF"><b>Pad&#279;kl&#371; apvadai 800 x 1200 mm. (&scaron;vies&#363;s)</b></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item27.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item27.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item27.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item27.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item27.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item27.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai 800 x 1200 mm. (tams&#363;s)</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item28.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item28.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item28.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item28.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item28.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item28.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai 600 x 800 mm. (&scaron;vies&#363;s)</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item29.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item29.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item29.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.repair.item29.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item29.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item29.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai 600 x 800 mm.(tams&#363;s)</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item30.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item30.prices}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item30.results || ''}</i></td>
            <td style="${InputBox}" align="center" valign=bottom bgcolor="#FFE796"><b>${selectedRowData.repair.item30.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item30.prices}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item30.results || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Pad&#279;kl&#371; apvadai nestandartiniai, pvz. 800x2000</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item31.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item31.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item31.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=bottom bgcolor="#FFE796"><b>${selectedRowData.repair.item31.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.repair.item31.prices}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item31.results || ''}</i></td>
        </tr>
        <!--<tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" rowspan=2 height="20" align="center" valign=middle bgcolor="#D9D9D9"><b>Dekos</b></td>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Dekos 800 x 1200 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${table['s_dekos_800x1200']?.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${storedPrices['s_dekos_800x1200']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${table['s_dekos_800x1200']?.totalPrice || ''}</i></td>
            <td style="${InputBox}" align="center" valign=bottom bgcolor="#FFE796"><b>${table['r_dekos_800x1200']?.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${storedPrices['r_dekos_800x1200']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${table['r_dekos_800x1200']?.totalPrice || ''}</i></td>
        </tr>
        <tr>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Dekos 1140 x 1140 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${table['s_dekos_1140x1140']?.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${storedPrices['s_dekos_1140x1140']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${table['s_dekos_1140x1140']?.totalPrice || ''}</i></td>
            <td style="${InputBox}" align="center" valign=bottom bgcolor="#FFE796"><b>${table['r_dekos_1140x1140']?.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${storedPrices['r_dekos_1140x1140']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${table['r_dekos_1140x1140']?.totalPrice || ''}</i></td>
        </tr>-->
        <!--<tr>
            <td style="border: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" rowspan=2 height="20" align="center" valign=middle bgcolor="#D9D9D9"><b>Plok&scaron;t&#279;</b></td>
            <td style="border-top: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle>MPP gaminys 1,  2,8 - 3,2 mm.</td>
            <td style="${InputBox}" align="center" valign=middle bgcolor="#FFE796"><b>${table['s_plokste_800x1200_p']?.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle bgcolor="#FFFFFF">${storedPrices['s_plokste_800x1200_p']}</td>
            <td style="${totalPriceLeftSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${table['s_plokste_800x1200_p']?.totalPrice || ''}</i></td>
            <td style="${InputBox}" align="center" valign=bottom bgcolor="#FFE796"><b>${table['r_plokste_800x1200_p']?.units || ''}</b></td>
            <td style="${priceBox}" align="center" valign=middle>${storedPrices['r_plokste_800x1200_p']}</td>
            <td style="${totalPriceRightSideBox}" align="center" valign=middle bgcolor="#FFFFFF"><i>${table['r_plokste_800x1200_p']?.totalPrice || ''}</i></td>
        </tr>
        <tr>
            <td style="font-size: 12px" border-bottom: 1px solid #000000; colspan=2 align="left" valign=middle>MPP gaminys 2,  6 - 10 mm.</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${table['s_plokste_800x1200_s']?.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${storedPrices['s_plokste_800x1200_s']}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${table['s_plokste_800x1200_s']?.totalPrice || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=bottom bgcolor="#FFE796"><b>${table['r_plokste_800x1200_s']?.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle>${storedPrices['r_plokste_800x1200_s']}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${table['r_plokste_800x1200_s']?.totalPrice || ''}</i></td>
        </tr>-->
        <tr>
            <td style="border: 1px solid #000000;  border-bottom: 1px solid #000000; border-right: 2px solid #000000; font-size: 12px" height="20" align="center" valign=middle bgcolor="#D9D9D9"><b>Mediniai pad&#279;klai</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; font-size: 12px" colspan=2 align="left" valign=middle bgcolor="#FFFFFF">Mediniai pad&#279;klai</td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFE796"><b>${selectedRowData.healthy.item32.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF">${selectedRowData.healthy.item32.prices}</td>
            <td style="${totalPriceLeftSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.healthy.item32.results || ''}</i></td>
            <td style="${InputBox} border-bottom: 1px solid #000000;" align="center" valign=bottom bgcolor="#FFE796"><b>${selectedRowData.repair.item32.units || ''}</b></td>
            <td style="${priceBox} border-bottom: 1px solid #000000;" align="center" valign=middle>${selectedRowData.repair.item32.prices}</td>
            <td style="${totalPriceRightSideBox} border-bottom: 1px solid #000000;" align="center" valign=middle bgcolor="#FFFFFF"><i>${selectedRowData.repair.item32.results || ''}</i></td>
        </tr>
        <tr>
            <td height="20" align="left" valign=top><br></td>
            <td align="left" valign=top><br></td>

            ${forPrint ? `<td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; font-size: 12px" colspan=1 align="center" valign=middle bgcolor="#FFFFFF"><b>Kvitas</b></td>` : `<td colspan=1 align="center" valign=middle bgcolor="#FFFFFF"><b></b></td>` }
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" colspan=3 align="center" valign=middle><b>Vnt.</b></td>
            <td style="border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 12px" colspan=3 align="center" valign=middle><b>Suma: EUR</b></td>
            <td align="center" valign=middle><i><br></i></td>
            <td align="center" valign=middle><b><br></b></td>
            <td align="center" valign=middle><br></td>
            <td align="center" valign=middle><i><br></i></td>
        </tr>
        <tr>
            <td height="20" align="left" valign=top><br></td>
            <td align="left" valign=top><br></td>
            ${forPrint ? `<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 30px" colspan=1 align="center" valign=middle><b></b></td>` : `<td colspan=1 align="center" valign=middle><b></b></td>` }
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 30px" colspan=3 align="center" valign=middle><b>${selectedRowData?.sumUnits}</b></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000; font-size: 30px" colspan=3 align="center" valign=middle><b>${selectedRowData?.sumPrices}</b></td>
            <td align="center" valign=middle><i><br></i></td>
            <td align="center" valign=middle><i><br></i></td>
            <td align="center" valign=middle><b><br></b></td>
            <td align="center" valign=middle><br></td>
            <td align="center" valign=middle><i><br></i></td>
        </tr>
    </table>

 
    <!-- ************************************************************************** -->
    </body>
    </html>`;

    const printModal = async () => {
        try {
            const { uri } = await Print.printToFileAsync({ html: html(true) });
            if (uri) {
                await Print.printAsync({ uri });
            }
        } catch (error) {
            console.error('Print Error:', error);
        }
    };


    return (
        <Modal visible={isModalVisible} animationType="fade" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {selectedRowData && (
                        <>
                            {/*<Text style={styles.modalTitle}>Row Data</Text>*/}
                            {/*<Text>ID: {JSON.stringify(selectedRowData)}</Text>*/}
                            {/*/!* Render other row data properties *!/*/}
                            <TouchableOpacity onPress={closeModal}>
                                <AntDesign style={styles.closeBtn} name={'closecircle'} size={24} color={'red'} />
                            </TouchableOpacity>
                            <WebView source={{ html: html(false) }} style={styles.webview} />
                            <TouchableOpacity onPress={printModal}>
                                <AntDesign style={styles.printBtn} name="printer" size={50} color="red" />
                            </TouchableOpacity>

                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    webview: {
        flex: 1,
        marginTop: 0,
        width: Dimensions.get('window').width - 100,
    },
    closeBtn: {
        zIndex: 20,
        flex: 12,
        position: "absolute",
        top: -20,
        right: -20,
    },
    printBtn: {
        zIndex: 20,
        flex: 12,
        position: "absolute",
        top: -50,
        left: 20,
    },
});

export default ModalComponent;
