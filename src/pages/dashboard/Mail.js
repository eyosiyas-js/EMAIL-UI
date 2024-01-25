import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Card, Grid } from '@material-ui/core';
// redux
import { useDispatch } from '../../redux/store';
import { getLabels } from '../../redux/slices/mail';
// routes
// hooks
import useSettings from '../../hooks/useSettings';
// components
import { MailList, MailDetails, MailSidebar, MailCompose } from '../../components/_main/mail';

// ----------------------------------------------------------------------

export default function Mail() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { mailId } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCompose, setOpenCompose] = useState(false);

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  return (
    <Grid title="Mail">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Card sx={{ height: { md: '72vh' }, display: { md: 'flex' } }}>
          <MailSidebar
            isOpenSidebar={openSidebar}
            onCloseSidebar={() => setOpenSidebar(false)}
            onOpenCompose={() => setOpenCompose(true)}
          />
          {mailId ? <MailDetails /> : <MailList onOpenSidebar={() => setOpenSidebar(true)} />}
          <MailCompose isOpenCompose={openCompose} onCloseCompose={() => setOpenCompose(false)} />
        </Card>
      </Container>
    </Grid>
  );
}
