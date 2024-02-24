<template>
    <ion-app>
        <!-- todo se não tiver conectado, deve redirecionar para a tela de conexão -->
        <!-- todo alterar o favicon -->
        <!-- todo alterar o nome na guia do navegador -->
        <!-- todo background no tema do Spotify -->
        <ion-content>
            <ion-split-pane content-id="main-content">
                <ion-router-outlet id="main-content"></ion-router-outlet>
            </ion-split-pane>
        </ion-content>
    </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonRouterOutlet, IonSplitPane, IonContent} from '@ionic/vue';

</script>

<style scoped>

</style>
