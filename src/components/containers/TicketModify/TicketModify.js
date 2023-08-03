import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TicketForm, FHCard, FHCardContent, FHCardHeader } from 'components';
import { useAsyncAction } from 'hooks';
import { getTickets, modifyTicket, removeTicket } from 'redux/actions';
import { useRouter } from 'next/router';
import { LINKS } from 'utils/constants';

const TicketModify = ({ ticketId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const ticketData = useSelector((state) =>
    state.main.tickets.results.find((t) => t.id === ticketId)
  );

  const handleSubmit = async (data) => {
    await dispatch(modifyTicket(ticketId, data));
    router.push(LINKS.tickets.path);
  };

  const handleDelete = async () => {
    await dispatch(removeTicket(ticketId));
    router.push(LINKS.tickets.path);
  };

  useAsyncAction(getTickets(), !ticketData);

  return (
    <FHCard>
      <FHCardHeader title="Modify Ticket" />
      <FHCardContent>
        {ticketData && (
          <TicketForm
            defaultValues={ticketData}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            updating
          />
        )}
      </FHCardContent>
    </FHCard>
  );
};

export default memo(TicketModify);
