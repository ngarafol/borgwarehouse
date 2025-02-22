//Lib
import React from 'react';
import classes from '../WizardStep1/WizardStep1.module.css';
import { IconTool, IconAlertCircle } from '@tabler/icons-react';
import CopyButton from '../../UI/CopyButton/CopyButton';

function WizardStep2(props) {
    ////Vars
    //Needed to generate command for borg over LAN instead of WAN if env vars are set and option enabled.
    let HOSTNAME;
    let SSH_SERVER_PORT;
    if (
        props.selectedOption.lanCommand &&
        process.env.NEXT_PUBLIC_HOSTNAME_LAN &&
        process.env.NEXT_PUBLIC_SSH_SERVER_PORT_LAN
    ) {
        HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME_LAN;
        SSH_SERVER_PORT = process.env.NEXT_PUBLIC_SSH_SERVER_PORT_LAN;
    } else {
        HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME;
        SSH_SERVER_PORT = process.env.NEXT_PUBLIC_SSH_SERVER_PORT;
    }

    return (
        <div className={classes.container}>
            <h1>
                <IconTool className={classes.icon} />
                Initialize a repository
            </h1>
            <div className={classes.description}>
                To initialize your repository with borgbackup :
                <br />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                    <div className={classes.code}>
                        borg init -e repokey-blake2 ssh://
                        {props.selectedOption.unixUser}@{HOSTNAME}:
                        {SSH_SERVER_PORT}/./
                        {props.selectedOption.repository}
                    </div>
                    <CopyButton
                        dataToCopy={`borg init -e repokey-blake2 ssh://${props.selectedOption.unixUser}@${HOSTNAME}:${SSH_SERVER_PORT}/./${props.selectedOption.repository}`}
                    />
                </div>
                <div className={classes.note}>
                    The encryption mode is the one recommended by BorgBackup.
                    For more information,{' '}
                    <a
                        href='https://borgbackup.readthedocs.io/en/stable/usage/init.html?highlight=init#more-encryption-modes'
                        rel='noreferrer'
                        target='_blank'
                    >
                        click here
                    </a>
                    .
                </div>
            </div>

            <div className={classes.separator}></div>
            <h2>Borgmatic</h2>
            <div className={classes.description}>
                If you are using Borgmatic and have <b>already edited</b> the
                (find a sample on the step 4) :
                <br />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                    <div className={classes.code}>
                        borg init -e repokey-blake2
                    </div>
                    <CopyButton dataToCopy='borg init -e repokey-blake2' />
                </div>
            </div>

            <h2>Vorta</h2>
            <div className={classes.description}>
                To "Initialize a new repository" or "Add existing repository",
                copy this into the field "Repository URL" of Vorta :
                <br />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                    <div className={classes.code}>
                        ssh://
                        {props.selectedOption.unixUser}@{HOSTNAME}:
                        {SSH_SERVER_PORT}/./
                        {props.selectedOption.repository}
                    </div>
                    <CopyButton
                        dataToCopy={`ssh://${props.selectedOption.unixUser}@${HOSTNAME}:${SSH_SERVER_PORT}/./${props.selectedOption.repository}`}
                    />
                </div>
                For more information about the Vorta graphical client, please
                refer to{' '}
                <a
                    href='https://vorta.borgbase.com/usage/remote/'
                    rel='noreferrer'
                    target='_blank'
                >
                    this documentation
                </a>
                .
            </div>

            <div className={classes.separator} />
            <div className={classes.verifyOrange}>
                <div className={classes.alert}>
                    <IconAlertCircle className={classes.iconAlert} />
                    <b>Check the fingerprint of server</b>
                </div>
                To check that you are talking to the right server, please make
                sure to validate the following sshPublicKeys when you first
                connect :
                <li>
                    <span className={classes.sshPublicKey}>
                        ECDSA :{' '}
                        {process.env.NEXT_PUBLIC_SSH_SERVER_FINGERPRINT_ECDSA}
                    </span>
                </li>
                <li>
                    <span className={classes.sshPublicKey}>
                        ED25519 :{' '}
                        {process.env.NEXT_PUBLIC_SSH_SERVER_FINGERPRINT_ED25519}
                    </span>
                </li>
                <li>
                    <span className={classes.sshPublicKey}>
                        RSA :{' '}
                        {process.env.NEXT_PUBLIC_SSH_SERVER_FINGERPRINT_RSA}
                    </span>
                </li>
            </div>

            <div className={classes.verifyRed}>
                <div className={classes.alert}>
                    <IconAlertCircle className={classes.iconAlert} />
                    <b>Save your passphrase</b>
                </div>
                Once again, the server cannot access your encrypted backup data
                or the encryption passphrase. Remember to put your passphrase in
                your password manager when you initialise your repository.
            </div>
        </div>
    );
}

export default WizardStep2;
