/** @format */

import { getGameWidth, getGameHeight } from "../helpers";
import { Gui } from "../objects/Gui";
import { parsedStorage } from "../storage";

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: "Gameover",
};

export class GameoverScene extends Phaser.Scene {
    private mainMessage: string;

    constructor() {
        super(sceneConfig);
    }

    private handlingStorage() {
        if (parsedStorage()) {
            const parsedUsers = parsedStorage();

            if (this.data.values.winner.id === parsedUsers.mainUser.id) {
                parsedUsers?.mainUser?.matchs?.push({ win: true });
                parsedUsers?.secondaryUser?.matchs?.push({ win: false });
            } else if (
                this.data.values.winner.id === parsedUsers.secondaryUser.id
            ) {
                parsedUsers?.secondaryUser?.matchs?.push({ win: true });
                parsedUsers?.mainUser?.matchs?.push({ win: false });
            }

            // Serialize and set in storage the newly updated users objects
            // with their corresponding matchs pushed entries.
            localStorage.setItem("hoafight", JSON.stringify(parsedUsers));
        }
    }

    init(gameSceneData) {
        if (gameSceneData.winner) {
            this.data.set("winner", gameSceneData.winner);
            this.mainMessage = `${this.data.values.winner.username} remporte la partie !`;
            this.handlingStorage();
        } else {
            this.mainMessage = "Oups on dirait qu'il n'y ai pas de gagnant !";
        }
    }

    create() {
        this.add.image(
            getGameWidth(this) / 2,
            getGameHeight(this) / 2,
            "backgroundForGUIScenes"
        );

        Gui.title({ scene: this, text: "Fin De Partie" });

        Gui.customText({
            scene: this,
            x: getGameWidth(this) / 2,
            y: 200,
            text: this.mainMessage,
        });

        Gui.mainBtn({
            scene: this,
            text: "REJOUER",
            stopSounds: false,
            scenePlugin: this.scene,
            newSceneKey: "Menu",
        });
    }
}
