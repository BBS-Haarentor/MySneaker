"""0_init

Revision ID: 94b72ee492b9
Revises: 
Create Date: 2022-08-31 16:21:05.396849

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision = '94b72ee492b9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('game',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Float(), nullable=True),
    sa.Column('last_edit', sa.Float(), nullable=True),
    sa.Column('grade_name', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('current_cycle_index', sa.Integer(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('scenario_order', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('signup_enabled', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_game_id'), 'game', ['id'], unique=False)
    op.create_table('scenario',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Float(), nullable=True),
    sa.Column('last_edit', sa.Float(), nullable=True),
    sa.Column('char', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('description', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('sneaker_price', sa.Float(), nullable=True),
    sa.Column('paint_price', sa.Float(), nullable=True),
    sa.Column('storage_fee_sneaker', sa.Float(), nullable=True),
    sa.Column('storage_fee_paint', sa.Float(), nullable=True),
    sa.Column('storage_fee_finished_sneaker', sa.Float(), nullable=True),
    sa.Column('employee_count_modifier_temporary', sa.Integer(), nullable=True),
    sa.Column('employee_count_modifier_permanent', sa.Integer(), nullable=True),
    sa.Column('factor_interest_rate', sa.Float(), nullable=True),
    sa.Column('employee_salary', sa.Float(), nullable=True),
    sa.Column('employee_signup_bonus', sa.Float(), nullable=True),
    sa.Column('employee_production_capacity', sa.Integer(), nullable=True),
    sa.Column('employee_cost_modfier', sa.Float(), nullable=True),
    sa.Column('sneaker_ask', sa.Integer(), nullable=True),
    sa.Column('factor_ad_take', sa.Float(), nullable=True),
    sa.Column('tender_offer_count', sa.Integer(), nullable=True),
    sa.Column('machine_purchase_allowed', sa.Boolean(), nullable=True),
    sa.Column('machine_purchase_cost1', sa.Float(), nullable=True),
    sa.Column('machine_purchase_cost2', sa.Float(), nullable=True),
    sa.Column('machine_purchase_cost3', sa.Float(), nullable=True),
    sa.Column('machine_production_capacity1', sa.Integer(), nullable=True),
    sa.Column('machine_production_capacity2', sa.Integer(), nullable=True),
    sa.Column('machine_production_capacity3', sa.Integer(), nullable=True),
    sa.Column('machine_employee_max', sa.Integer(), nullable=True),
    sa.Column('machine_maintainance_cost1', sa.Float(), nullable=True),
    sa.Column('machine_maintainance_cost2', sa.Float(), nullable=True),
    sa.Column('machine_maintainance_cost3', sa.Float(), nullable=True),
    sa.Column('production_cost_per_sneaker1', sa.Float(), nullable=True),
    sa.Column('production_cost_per_sneaker2', sa.Float(), nullable=True),
    sa.Column('production_cost_per_sneaker3', sa.Float(), nullable=True),
    sa.Column('employee_change_allowed', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('char')
    )
    op.create_index(op.f('ix_scenario_id'), 'scenario', ['id'], unique=False)
    op.create_table('user',
    sa.Column('game_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Float(), nullable=True),
    sa.Column('last_edit', sa.Float(), nullable=True),
    sa.Column('name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('last_login', sa.Float(), nullable=True),
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('hashed_pw', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['game_id'], ['game.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    
    # manual edit -> foreign key constraint must be added after user table to prevent circular dependency
    op.create_foreign_key(constraint_name='fk_owner_id', source_table='game', referent_table='user', local_cols=['owner_id'], remote_cols=['id'])

    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)
    op.create_index(op.f('ix_user_name'), 'user', ['name'], unique=False)
    op.create_table('admingroup',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Float(), nullable=True),
    sa.Column('last_edit', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_admingroup_id'), 'admingroup', ['id'], unique=False)
    op.create_table('basegroup',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Float(), nullable=True),
    sa.Column('last_edit', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_basegroup_id'), 'basegroup', ['id'], unique=False)
    op.create_table('cycle',
    sa.Column('game_id', sa.Integer(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Float(), nullable=True),
    sa.Column('last_edit', sa.Float(), nullable=True),
    sa.Column('current_cycle_index', sa.Integer(), nullable=True),
    sa.Column('buy_sneaker', sa.Integer(), nullable=True),
    sa.Column('buy_paint', sa.Integer(), nullable=True),
    sa.Column('planned_production_1', sa.Integer(), nullable=True),
    sa.Column('planned_production_2', sa.Integer(), nullable=True),
    sa.Column('planned_production_3', sa.Integer(), nullable=True),
    sa.Column('planned_workers_1', sa.Integer(), nullable=True),
    sa.Column('planned_workers_2', sa.Integer(), nullable=True),
    sa.Column('planned_workers_3', sa.Integer(), nullable=True),
    sa.Column('include_from_stock', sa.Integer(), nullable=True),
    sa.Column('sales_planned', sa.Integer(), nullable=True),
    sa.Column('sales_bid', sa.Float(), nullable=True),
    sa.Column('tender_offer_price', sa.Float(), nullable=True),
    sa.Column('research_invest', sa.Float(), nullable=True),
    sa.Column('ad_invest', sa.Float(), nullable=True),
    sa.Column('take_credit', sa.Float(), nullable=True),
    sa.Column('payback_credit', sa.Float(), nullable=True),
    sa.Column('new_employees', sa.Integer(), nullable=True),
    sa.Column('let_go_employees', sa.Integer(), nullable=True),
    sa.Column('buy_new_machine', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['user.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['game_id'], ['game.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_cycle_id'), 'cycle', ['id'], unique=False)
    op.create_table('stock',
    sa.Column('game_id', sa.Integer(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Float(), nullable=True),
    sa.Column('last_edit', sa.Float(), nullable=True),
    sa.Column('current_cycle_index', sa.Integer(), nullable=True),
    sa.Column('sneaker_count', sa.Integer(), nullable=True),
    sa.Column('paint_count', sa.Integer(), nullable=True),
    sa.Column('finished_sneaker_count', sa.Integer(), nullable=True),
    sa.Column('employees_count', sa.Integer(), nullable=True),
    sa.Column('research_budget', sa.Float(), nullable=True),
    sa.Column('account_balance', sa.Float(), nullable=True),
    sa.Column('credit_taken', sa.Float(), nullable=True),
    sa.Column('real_sales', sa.Integer(), nullable=True),
    sa.Column('income_from_sales', sa.Float(), nullable=True),
    sa.Column('research_production_modifier', sa.Float(), nullable=True),
    sa.Column('machine_1_space', sa.Integer(), nullable=True),
    sa.Column('machine_2_space', sa.Integer(), nullable=True),
    sa.Column('machine_3_space', sa.Integer(), nullable=True),
    sa.Column('insolvent', sa.Boolean(), nullable=True),
    sa.Column('tender_sales', sa.Integer(), nullable=True),
    sa.Column('tender_price', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['user.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['game_id'], ['game.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_stock_id'), 'stock', ['id'], unique=False)
    op.create_table('teachergroup',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Float(), nullable=True),
    sa.Column('last_edit', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_teachergroup_id'), 'teachergroup', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_teachergroup_id'), table_name='teachergroup')
    op.drop_table('teachergroup')
    op.drop_index(op.f('ix_stock_id'), table_name='stock')
    op.drop_table('stock')
    op.drop_index(op.f('ix_cycle_id'), table_name='cycle')
    op.drop_table('cycle')
    op.drop_index(op.f('ix_basegroup_id'), table_name='basegroup')
    op.drop_table('basegroup')
    op.drop_index(op.f('ix_admingroup_id'), table_name='admingroup')
    op.drop_table('admingroup')
    op.drop_index(op.f('ix_user_name'), table_name='user')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_table('user')
    op.drop_index(op.f('ix_scenario_id'), table_name='scenario')
    op.drop_table('scenario')
    op.drop_index(op.f('ix_game_id'), table_name='game')
    op.drop_table('game')
    # ### end Alembic commands ###
