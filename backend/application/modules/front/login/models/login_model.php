<?php
defined('BASEPATH') || exit('No direct script access allowed');

class Login_model extends CI_Model
{
    public $table_name;
    public $table_alias;
    public $primary_key;
    public $primary_alias;
    public $grid_fields;
    public $join_tables;
    public $extra_cond;
    public $groupby_cond;
    public $orderby_cond;
    public $unique_type;
    public $unique_fields;
    public $switchto_fields;
    public $default_filters;
    public $search_config;
    public $relation_modules;
    public $deletion_modules;
    public $print_rec;
    public $multi_lingual;
    public $physical_data_remove;

    public $listing_data;
    public $rec_per_page;
    public $message;

    var $table                  = 'admin';
    var $table_house_file       = 'house_file';
    var $table_house_file_dub   = 'house_file_dub';
    var $table_prospecting      = 'prospecting';
    var $table_prospecting_dub  = 'prospecting_dub';

    
    public function __construct()
    {
        parent::__construct();
    }

    public function add($data)
    {
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }
    public function house_data_add($data)
    {
        $this->db->insert($this->table_house_file, $data);
        return $this->db->insert_id();
    }
    public function house_data_dublicate($data)
    {
        $this->db->insert($this->table_house_file_dub, $data);
        return $this->db->insert_id();
    }
    
    public function prospecting_data_add($data)
    {
        $this->db->insert($this->table_prospecting, $data);
        return $this->db->insert_id();
    }
    
    public function prospecting_data_add_dub($data)
    {
        $this->db->insert($this->table_prospecting_dub, $data);
        return $this->db->insert_id();
    }

    public function login($email, $password)
    {
        $this->db->from($this->table);

        $this->db->where('vEmail', $email );
        $this->db->where('vPassword', $password );
        $this->db->where('eStatus', 'Active');

        $query=$this->db->get();
        return $query->row();
    }
}
